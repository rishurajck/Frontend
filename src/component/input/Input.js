import React from "react";
import styles from "./Input.module.css";
function input({ label, type, name, id, value, placeholder, onChange }) {
  return (
    <div className={styles.loginInput}>
      <label className={styles.inputLabel} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.inputField}
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default input;
