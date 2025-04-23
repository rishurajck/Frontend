import axios from "axios";
import store from "../redux/store";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 10000,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth?.user?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else if (status === 500) {
        console.warn("Server error. Try again later.");
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
