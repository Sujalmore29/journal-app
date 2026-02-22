import axios from "axios";


const AUTH_API = axios.create({
    baseURL: "http://localhost:8080/public"
});

export const signup = (user) => AUTH_API.post("/signup", user);
export const login = (user) => AUTH_API.post("/login", user);