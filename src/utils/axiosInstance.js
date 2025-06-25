import axios from "axios";

const currentUrl = window.location.hostname;

const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return `http://${currentUrl}:5000/api`;
    // return "http://localhost:3001/v1"
  }
  // Production için gerçek URL
  return "https://odaanket.odanet.net/api";
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios instance token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
