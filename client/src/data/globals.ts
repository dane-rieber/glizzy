import Axios from "axios";

const globals = {
    token: '',
    api: Axios.create({baseURL: 'http://localhost:3001/'})
};
export default globals;