import axios from "axios";

console.log("API URL:", import.meta.env.VITE_REACT_APP_API_URL);

// Create an Axios instance
const api = axios.create({
  baseURL: `http://localhost:8080/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include JWT
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("JWT_TOKEN");
    // console.log("Token: " + token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log("X-XSRF-TOKEN " + csrfToken);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
