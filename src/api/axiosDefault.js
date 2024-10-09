import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export default axiosInstance;
