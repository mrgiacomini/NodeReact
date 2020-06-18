import axios from "axios";
import { getCookie, signout } from '../helpers/auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: `Bearer ${getCookie('token')}`
   }
});

api.interceptors.response.use(
  response => Promise.resolve(response),
  error => errorHandler(error)
);

const errorHandler = (error) => {
  if (error.response.status === 401) signout(()=>{setTimeout(() => window.location.reload(), 500)})
  
  return Promise.reject(error);
}

export default api;