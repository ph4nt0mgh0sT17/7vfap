import axios from "axios";
import {LoginResponse} from "./Models/Responses/LoginResponse";

const HttpClient = axios.create({});

HttpClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('user');
        // @ts-ignore
        let loginResponse: LoginResponse = JSON.parse(token);
        const auth = loginResponse?.jwtToken ? `Bearer ${loginResponse?.jwtToken}` : '';
        // @ts-ignore
        config.headers.common['Authorization'] = auth;
        return config;
    },
    error => Promise.reject(error),
);

export default HttpClient;