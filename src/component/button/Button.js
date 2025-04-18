import React from "react";
import styles from "./Button.module.css";
function Button({ text, type }) {
  return (
    <div className={styles.btn}>
      <button className={styles.loginBtn} type={type}>
        {text}
      </button>
    </div>
  );
}

export default Button;
