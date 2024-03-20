import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const Axios = axios.create({
  baseURL: `${BASE_URL}/`,

});

export default Axios;