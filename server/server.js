const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();

const app = express();
const port = 3001;

app.use(bodyParser.json());

const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'glizzy',
    user: 'postgres',
    password: 'glizzy'
};

var db = pgp(dbConfig);

function sendError(err, res) {
    console.log("BRUH: ", err);
    res.status(500).json({ status: 'Error', message: 'uh oh, someone didnt implement good error handling (sorry)', error: err });
}

/*

AUTHORIZATION

*/

var tokens = []; // super secure token system (v1.0)

// Keep the gates wide open
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    db.one(`select * from glizzy_user where username = '${username}';`)
        .then(user => {
            var user_id = user.id;

            if (user.password === password) { // If correct authentication is provided
                var token = tokens.filter(t => t.user_id === user_id)[0]; // See if user already has token

                if (!token) {
                    var new_token;
                    do {
                        new_token = Math.random().toString().split('.')[1] // Generate random number as token
                    } while (tokens.filter(t => t.auth_token === new_token).length) // Make sure no two tokens are the same

                    token = {
                        user_id: user_id,
                        token: new_token
                    };
                    tokens.push(token); // Save token
                }

                res.status(200).json({ status: 'Authorized', auth_token: token.token });
            } else {
                res.status(401).json({ status: 'Unauthorized' });
            }
        })
        .catch(err => sendError(err, res));
})

function get_token(req) {
    var existing_token = tokens.filter(t => t.token === req.headers.authorization)[0]; // Find token from request
    return existing_token;
}

/*

GROCERY LIST ENDPOINTS

*/

app.get('/lists', (req, res) => {
    var token = get_token(req);
    if (!token) {
        res.status(401).json({ status: 'Unauthorized', message: 'Auth token is invalid' });
        return;
    }

    db.any(`select * from list where user_id = ${token.user_id};`)
        .then(rows => res.status(200).json(rows)) // return psql's json response
        .catch(err => sendError(err, res))
})

app.get('/list/:id', (req, res) => {
    var token = get_token(req);
    if (!token) {
        res.status(401).json({ status: 'Unauthorized', message: 'Auth token is invalid' });
        return;
    }

    var list_id = req.params.id;
    if (!list_id) {
        res.status(400).json({ message: 'Please specify a list id as a url parameter' });
        return;
    }

    db.one(`select user_id from list where id = ${list_id};`)
        .then(list => {
            if (list.user_id !== token.user_id) {
                res.status(401).json({ status: 'Unauthorized', message: 'List does not belong to user' });
                return;
            }
            
            db.task(t => {
                return t.batch([
                    t.one(`select * from list where id = ${list_id};`),
                    t.any(`select * from grocery where list_id = ${list_id};`)
                ])
            })
                .then(results => res.status(200).json({list: results[0], groceries: results[1]}))
                .catch(err => sendError(err, res))
        })
        .catch(err => sendError(err, res))
})

app.patch('/list/:id', (req, res) => {
    var token = get_token(req);
    if (!token) {
        res.status(401).json({ status: 'Unauthorized', message: 'Auth token is invalid' });
        return;
    }

    var list_id = req.params.id;
    if (!list_id) {
        res.status(400).json({ message: 'Please specify a list id as a url parameter' });
        return;
    }

    var name = req.body.name;
    if (!name) {
        res.status(400).json({ message: 'New list name must be provided in request body' });
        return;
    }

    db.one(`select user_id from list where id = ${list_id};`)
        .then(list => {
            if (list.user_id !== token.user_id) {
                res.status(401).json({ status: 'Unauthorized', message: 'List does not belong to user' });
                return;
            }

            db.one(`update list set name = '${name}' where id = ${list_id} returning id;`)
                .then(id => res.status(200).json({ message: 'List updated', list_id: id })) // returns id of updated list
                .catch(err => sendError(err, res))
        })
        .catch(err => sendError(err, res))
})

app.post('/list/:id/add', (req, res) => {
    var token = get_token(req);
    if (!token) {
        res.status(401).json({ status: 'Unauthorized', message: 'Auth token is invalid' });
        return;
    }

    var list_id = req.params.id;
    if (!list_id) {
        res.status(400).json({ message: 'Please specify a list id as a url parameter' });
        return;
    }

    db.one(`select user_id from list where id = ${list_id};`)
        .then(list => {
            if (list.user_id !== token.user_id) {
                res.status(401).json({ status: 'Unauthorized', message: 'List does not belong to user' });
                return;
            }

            /*
            The following code builds a psql query depending on which parameters are specified in the request.
            This way, not all paramaters need to be specified when creating a grocery object.
            */

            var name = req.body.name;
            var quantity = req.body.quantity;
            var store_id = req.body.store_id;
            var price = req.body.price;
            var active = req.body.active;

            var queryFields = '';
            var queryValues = '';

            if (name) {
                queryFields += 'name';
                queryValues += `'${name}'`;
            } else {
                res.status(400).json({ message: 'Grocery name must be provided in request body' })
                return;
            }

            if (quantity) {
                queryFields += ',quantity';
                queryValues += `,${quantity}`;
            }
            if (store_id) {
                queryFields += ',store_id';
                queryValues += `,${store_id}`;
            }
            if (price) {
                queryFields += ',price';
                queryValues += `,'${price}'`;
            }
            if (active) {
                queryFields += ',active';
                queryValues += `,${active}`;
            }

            queryFields += ',list_id';
            queryValues += `,${list_id}`;

            db.one(`insert into grocery(${queryFields}) values (${queryValues}) returning id;`)
                .then(id => res.status(200).json({ message: 'Grocery created', grocery_id: id })) // Returns id of created grocery
                .catch(err => sendError(err, res))
        })
        .catch(err => sendError(err, res))
})

/*

GROCERY ENDPOINTS

*/

app.get('/grocery/:id', (req, res) => {
    var token = get_token(req);
    if (!token) {
        res.status(401).json({ status: 'Unauthorized', message: 'Auth token is invalid' });
        return;
    }

    var grocery_id = req.params.id;
    if (!grocery_id) {
        res.status(400).json({ message: 'Please specify a grocery id as a url parameter' });
        return;
    }

    // Check that the user accessing the grocery owns the list that contains the grocery
    db.one(`select user_id from list where id = (select list_id from grocery where id = ${grocery_id});`)
        .then(list => {
            if (list.user_id !== token.user_id) {
                res.status(401).json({ status: 'Unauthorized', message: 'Grocery does not belong to user' });
                return;
            }

            db.one(`select * from grocery where id = ${grocery_id};`)
                .then(grocery => res.status(200).json(grocery)) // return psql response for grocery
                .catch(err => sendError(err, res))
        })
        .catch(err => sendError(err, res))
})

app.patch('/grocery/:id', (req, res) => {
    var token = get_token(req);
    if (!token) {
        res.status(401).json({ status: 'Unauthorized', message: 'Auth token is invalid' });
        return;
    }

    var grocery_id = req.params.id;
    if (!grocery_id) {
        res.status(400).json({ message: 'Please specify a grocery id as a url parameter' });
        return;
    }

    // Check that the user accessing the grocery owns the list that contains the grocery
    db.one(`select user_id from list where id = (select list_id from grocery where id = ${grocery_id});`)
        .then(list => {
            if (list.user_id !== token.user_id) {
                res.status(401).json({ status: 'Unauthorized', message: 'Grocery does not belong to user' });
                return;
            }

            /*
            The following code builds a psql query depending on which parameters are specified in the request.
            This way, not all paramaters need to be specified when updating a grocery object.
            */

            var name = req.body.name;
            var quantity = req.body.quantity;
            var store_id = req.body.store_id;
            var price = req.body.price;
            var active = req.body.active;

            var query = '';

            if (name) query += `name='${name}',`;
            if (quantity) query += `quantity=${quantity},`;
            if (store_id) query += `store_id=${store_id},`;
            if (price) query += `price='${price}',`;
            if (active) query += `active=${active}`;

            if (query === '') {
                res.status(400).json({ message: 'Request body did not contain information to update' });
                return;
            }

            // Remove trailing commas from query string
            if (query[query.length - 1] === ',') {
                query = query.substr(0, query.length - 1);
            }

            db.one(`update grocery set ${query} where id = ${grocery_id} returning id;`)
                .then(id => res.status(200).json({ message: 'Grocery item updated', grocery_id: id })) // return id of updated grocery
                .catch(err => sendError(err, res))
        })
        .catch(err => sendError(err, res))
})

/*

STORE ENDPOINTS

*/

// No authentication is needed to get list of stores since this is universal for all users
app.get('/stores', (req, res) => {
    db.any('select * from store;')
        .then(stores => res.status(200).json(stores))
        .catch(err => sendError(err, res))
})

/*

CREATE ENDPOINTS

*/

app.post('/create/user', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.status(400).json({ message: 'New username/password must be provided in request body' });
        return;
    }

    // Make sure username doesn't already exist
    db.any(`select id from glizzy_user where username = '${username}';`)
        .then(rows => {
            if (rows.length !== 0) {
                res.status(401).json({ message: 'User already exists' })
                return;
            }

            db.none(`insert into glizzy_user(username, password) values ('${username}', '${password}');`)
                .then(() => res.status(200).json({ message: 'User created', username: username })) // Returns username of newly created user
                .catch(err => sendError(err, res))
        })
        .catch(err => sendError(err, res))
})

app.post('/create/list', (req, res) => {
    var token = get_token(req);
    if (!token) {
        res.status(401).json({ status: 'Unauthorized', message: 'Auth token is invalid' });
        return;
    }

    var name = req.body.name;
    if (!name) {
        res.status(400).json({ message: 'List name must be provided in request body' });
        return;
    }

    db.one(`insert into list(name, user_id) values ('${name}', ${token.user_id}) returning id;`)
        .then(id => res.status(200).json({ message: 'List created', list_id: id })) // returns id of newly created list
        .catch(err => sendError(err, res))
})

app.listen(port, () => {
    console.log(`Glizzy listening at http://localhost:${port}`)
})