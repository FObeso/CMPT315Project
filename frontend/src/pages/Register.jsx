import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../components/Input";


const Register = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    driverLicense: "",
    email: "",
    password: "",
    phoneNumber: "",
    dob: "",
    goldMembership: false,
    province: "",
    city: "",
    postalCode: "",
    streetNumber: "",
    streetName: "",
    unitNumber: "",
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const getCustomers = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/customer/`).then((res) => {
      console.log(res.data);
      setCustomers(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customer);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}register/`, {
        ...customer,
      })
      .then((res) => {
        if (res.status === 201) {
          setCustomers((prevCustomers) => [...prevCustomers, { ...customer }]);

          toast.success("Registered Created Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <Typography
        id="modal-modal-title"
        variant="h5"
        component="h2"
        className="text-center"
      >
        Register
      </Typography>
      <hr />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              handleChange={handleChange}
              type="text"
              name="firstname"
              placeholder="First Name"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              handleChange={handleChange}
              type="text"
              name="lastname"
              placeholder="Last Name"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              handleChange={handleChange}
              type="text"
              name="driverLicense"
              placeholder="Driver License"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              handleChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              handleChange={handleChange}
              type={"password"}
              name="password"
              placeholder="Password"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              handleChange={handleChange}
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              handleChange={handleChange}
              type="text"
              name="dob"
              placeholder="Date of Birth"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              handleChange={handleChange}
              type="text"
              name="city"
              placeholder="City"
            />
          </Grid>
          <Grid item xs={5}>
          <label htmlFor="status">Province: </label>
            <select name="province"
             onChange={handleChange} 
             className="w-100 m-2 ml-5 mt-8 p-2 border rounded-md border-primary">
            <option value=""></option>
              <option value="Alberta">Alberta</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Manitoba">Manitoba</option>
              <option value="New Brunswick">New Brunswick</option>
              <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
              <option value="Northwest Territories">Northwest Territories</option>
              <option value="Nova Scotia">Nova Scotia</option>
              <option value="Nunavut">Nunavut</option>
              <option value="Ontario">Ontario</option>
              <option value="Prince Edward Island">Prince Edward Island</option>
              <option value="Quebec">Quebec</option>
              <option value="Saskatchewan">Alberta</option>
              <option value="Yukon">Alberta</option>
            </select>
          </Grid>
          <Grid item xs={3}>
            <Input
              handleChange={handleChange}
              type="text"
              name="postalCode"
              placeholder="Postal Code"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              handleChange={handleChange}
              type="text"
              name="streetNumber"
              placeholder="Street Number"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              handleChange={handleChange}
              type="text"
              name="streetName"
              placeholder="Street Name"
            />
          </Grid>
          <Grid item xs={2}>
            <Input
              handleChange={handleChange}
              type="int"
              name="unitNumber"
              placeholder="Unit Number"
            />
          </Grid>
        </Grid>

        <div className="flex items-center justify-center mt-6">
          <Button color="success" variant="contained" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  )
};

export default Register;
