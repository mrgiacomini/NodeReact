import axios from "axios";
import { getCookie } from '../helpers/auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: `Bearer ${getCookie('token')}`
   }
});

export default api;