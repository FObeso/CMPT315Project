import axios from "axios";
import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

const useBranches = () => {
  const [branches, setBranches] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/branch/`)
      .then((res) => {
        setBranches(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }, []);
  return [branches, setBranches];
};

export default useBranches;
