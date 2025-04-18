import React from "react";
import styles from "./Unauthorized.module.css";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>401</h1>
      <h2 className={styles.title}>Unauthorized Access</h2>
      <p className={styles.message}>
        You don't have permission to view this page. Please login with the
        appropriate account.
      </p>
      <button onClick={() => navigate("/login")} className={styles.button}>
        Go to Login
      </button>
    </div>
  );
};

export default Unauthorized;
