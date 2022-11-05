import React from "react";
import styles from "../styles/Login.module.css";
const Input = ({ handleChange, type, name, placeholder }) => {
  return (
    <input
      className={styles.input}
      onChange={handleChange}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default Input;
