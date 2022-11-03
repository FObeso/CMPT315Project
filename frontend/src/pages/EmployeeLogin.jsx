import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/employee/login`, {
        params: {
          email: JSON.stringify(userInfo.email),
          password: userInfo.password,
        },
      })
      .then((res) => {
        // save in localstorage: make sure to save the user type as otherwise can't access protected routes
        localStorage.setItem("email", res.data.employee.email);
        localStorage.setItem("type", "employee");
        setDisabled(false);
        toast.success("Login Successful");
        // change the route to the admin page
        navigate("/employee");
      })
      .catch(function (err) {
        console.log(err);
        setDisabled(false);
        toast.error(err.message);
      });
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex-0 mt-20 pt-5 w pb-5  justify-center items-center rounded-md border border-black">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center font-bold text-2xl">
            <span>Admin Login</span>
          </div>
          <hr className="m-0" />

          <div className="pr-5 pl-5">
            <input
              className={styles.input}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email Address"
            />

            <input
              className={styles.input}
              onChange={handleChange}
              type={"password"}
              name="password"
              placeholder="Password"
            />
            <section className={`${styles.loginFooter}  mb-4 mt-9`}>
              <button
                type="submit"
                disabled={disabled}
                className={disabled ? styles.disabled : ""}
              >
                Login
              </button>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
