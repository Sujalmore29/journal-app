import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};

export const isAdmin = () => {
    const token = localStorage.getItem("token");
    if(!token){ 
        return false;
    }

    const decoded = jwtDecode(token);

    return decoded.roles?.includes("ROLE_ADMIN");
}