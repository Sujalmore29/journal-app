import axios from 'axios'
import toast from 'react-hot-toast';

const API = axios.create({
    baseURL: "http://localhost:8080/journal"
});

//attach token to every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if(token){
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

API.interceptors.response.use(
    (res) => res,
    (error) => {
        if(error.response && error.response.status === 401){
            localStorage.removeItem("token");
            toast.error("Sesssion expired. Please login again.");

            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        }
        return Promise.reject(error);
    }
);
export const getAllEntries = () => API.get("");
export const createEntry = (data) => API.post("",data);
export const getEntryById = (id) => API.get(`/id/${id}`);
export const deleteEntryById = (id) => API.delete(`/id/${id}`);
export const updateEntryById = (id,data) => API.put(`/id/${id}`,data);

