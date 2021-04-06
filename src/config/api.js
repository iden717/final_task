import axios from "axios";

export const API = axios.create({
  baseURL: process.env.URL_API + process.env.API_VERSION,
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
