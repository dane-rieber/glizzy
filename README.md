# ORGANIZATION/STRUCTURE

- client: Contains frontend app built on Ionic
- server: Contains Node.JS/Express framework for accessing data
- data_dumps: Contains SQL dumps for test data as well as scripts for dumping/restoring data
- Architecture diagrams and data models are included in the parent directory

# HOW TO BUILD/RUN

- client:
1. Change directory to the client folder
2. `npm install`
3. `ionic serve`

- server:
1. Change directory to the server folder
2. `npm install`
3. `node server.js`

- database:
1. Create postgresql database instance
2. Change directory to the data_dumps folder
3. To restore, run `./restore_db.sh`
4. To dump existing, run `./dump_db.sh`
5. Note: you may need to `chmod a+x` the files before running them

# TEST CASES

User Acceptance Tests:
- Users should be able to add a grocery element to a list and see that item's information.
- Users should be able to submit a form to create an account.
- Users should be able to login to their account and access the appropriate list using a username and password.

Acceptance Criteria for above User Cases:
- A user can only submit a form to create an account if mandatory fields are completed.
-- Username
-- Password

- User should be able to login to their account
-- User information should be stored in the ‘user’ table in the ‘glizzy’ database
-- Information should be matched with the ‘user’ table in order to validate information

- User should be able to see item information
-- Item information should be stored in the ‘grocery’ table in the glizzy database
-- Item information should be retrieved from the database and shown on screen
-- Item information should include:
--- Name
--- Price
--- Store
--- Quantity
