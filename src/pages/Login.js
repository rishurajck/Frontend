import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { setUser } from "../redux/actions/authActions";
import logo from "../assets/Cloudkeeper_New.svg";
import styles from "../pages/Login.module.css";
import Input from "../component/input/Input";
import FormConfig from "../config/Formconfig";
import Button from "../component/button/Button";
import Footer from "../component/footer/Footer";

function Login() {
  const [details, setDetails] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordField = FormConfig.find((f) => f.name === "password");
    const { minLength, pattern, errorMsg } = passwordField.validation || {};

    if (minLength && details.password.length < minLength) {
      toast.error(errorMsg || "Password too short");
      return;
    }

    if (pattern && !pattern.test(details.password)) {
      toast.error(errorMsg || "Password pattern mismatch");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        details
      );
      const userData = response.data;

      dispatch(setUser(userData));
      toast.success("Login Successful ✅", {
        position: "top-right",
        theme: "colored",
      });

      setTimeout(() => {
        const role = userData.role;
        switch (role) {
          case "CUSTOMER":
            navigate("/dashboard/costexplorer");
            break;
          default:
            navigate("/dashboard/usermanagement");
        }
      }, 800);
    } catch (error) {
      toast.error("Invalid Credentials ❌", {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.loginCard}>
      <ToastContainer />
      <div className={styles.loginHeader}>
        <img src={logo} alt="CloudBalance" className={styles.logo} />
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {FormConfig.slice(0, 2).map((form) => (
            <Input
              key={form.id}
              {...form}
              value={details[form.name]}
              onChange={handleChange}
            />
          ))}
          <Button type="submit" text="Login" styles={styles.loginBtn} />
        </form>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
