import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const useCustomer = (id) => {
  const [customer, setCustomer] = useState({});
  console.log(id);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/customer/`, {
        params: {
          id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCustomer(res.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return [customer, setCustomer];
};

export default useCustomer;
