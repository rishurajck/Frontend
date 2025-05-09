import axios from "axios";
import store from "../redux/store";
import { toast } from "react-toastify";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 10000,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth?.user?.token;
    console.log(token);

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
        toast.error("Session Expired! Please Login Again!", {
          position: "top-right",
          theme: "colored",
          autoClose: 800,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else if (status === 500) {
        toast.success("Some Error Occurred!", {
          position: "top-right",
          theme: "colored",
          autoClose: 800,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
