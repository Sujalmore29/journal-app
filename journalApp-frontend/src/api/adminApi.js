import axios from "axios";
import { data } from "react-router-dom";

const API = axios.create({
    baseURL: "http://localhost:8080/admin"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if(token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const getAllUsers = () => API.get("/getAllUser");

export const promoteToAdmin = (username) => API.post(`/promote/${username}`);

export const deleteUserByAdmin = (username) => API.delete(`/delete-user/${username}`);

export const refreshCache = () => API.get("/clear-appCache");
