import axios from "axios";

import { AuthUser } from "../types/veterinarioTypes";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  config =>
  {
    const data = localStorage.getItem('user')
    if(data)
    {
      const user : AuthUser =  JSON.parse(data)
      config.headers["Authorization"] = `Bearer ${user.JwtToken.token}`;
    }

    return config
  },
  error =>
  {
    return Promise.reject(error)
  }
);

api.interceptors.response.use(
 
);

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
  patch: api.patch,
};
