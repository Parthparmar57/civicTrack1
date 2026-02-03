import axios from "axios";
import config from "../config/config.js";

const API = axios.create({
    baseURL: config.api.baseURL,
});


API.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem("token");
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => Promise.reject(error)
);

export default API;
