import React from "react";
import styles from "../styles/Login.module.css";
const Input = ({ handleChange, type, name, placeholder, disabled, value }) => {
  if (!value) {
    return (
      <input
        className={styles.input}
        onChange={handleChange}
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled ? disabled : false}
      />
    );
  } else {
    return (
      <input
        className={styles.input}
        onChange={handleChange}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled ? disabled : false}
      />
    );
  }
};

export default Input;
