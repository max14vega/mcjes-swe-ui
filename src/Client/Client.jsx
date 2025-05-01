import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
//makes our instance of axios

//Automatically attach token to every request if it exists
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});