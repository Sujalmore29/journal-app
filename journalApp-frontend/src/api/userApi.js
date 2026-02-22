import axios from "axios";


const API = axios.create({
    baseURL: "http://localhost:8080/user"
})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if(token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const getUserGreeting = () => API.get("/get-user-and-weather");

export const updateUser = (data) => API.put("",data);

export const deleteUser = () => API.delete("");

export const getProfile = () => API.get("/get-user");