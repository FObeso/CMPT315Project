import axios from "axios";
import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

const useCarTypes = () => {
  const [carTypes, setCarTypes] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/carType/`)
      .then((res) => {
        setCarTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }, []);
  return [carTypes, setCarTypes];
};

export default useCarTypes;
