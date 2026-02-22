import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

function AdminRoute({ children }) {
    try{
        if(!isAdmin()) {
        return <Navigate to="/" replace />;
    }
    return children;
} catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
}
};

export default AdminRoute;