import axios from "axios";
import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/customer/`)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }, []);
  return [customers, setCustomers];
};

export default useCustomers;
