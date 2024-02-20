import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { getToken } from "./auth";

export const API=axios.create({
    baseURL:BASE_URL
})

export const SECURE_API=axios.create({
    baseURL:BASE_URL
})

SECURE_API.interceptors.request.use( (config) =>{
    const token=getToken();
    if(token) {
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
},(error) =>{
   return Promise.reject(error);
})