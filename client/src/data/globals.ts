import Axios from "axios";

const globals = {
    token: '',
    api: Axios.create({baseURL: 'http://localhost:3001/'}),
    list_id: '',
    stores: []
};
globals.api.get('/stores')
    .then(res => globals.stores = res.data);
export default globals;