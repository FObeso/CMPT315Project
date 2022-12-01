import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useCars = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/cars/`)
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }, []);
  return [cars, setCars];
};

export default useCars;
