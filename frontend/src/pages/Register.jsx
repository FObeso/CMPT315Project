import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customer.firstname.length === 0) {
      toast.error("First name required");
      return;
    }
    if (customer.lastname.length === 0) {
      toast.error("Last name required");
      return;
    }
    if (customer.driverLicense.length === 0) {
      toast.error("Driver license required");
      return;
    }
    if (customer.email.length === 0) {
      toast.error("Email required");
      return;
    }
    if (customer.password.length === 0) {
      toast.error("Password required");
      return;
    }
    if (customer.phoneNumber.length === 0) {
      toast.error("Phone Number required");
      return;
    }
    if (customer.dob.length === 0) {
      toast.error("Date of birth required");
      return;
    }
    if (customer.province.length === 0) {
      toast.error("Province required");
      return;
    }
    if (customer.city.length === 0) {
      toast.error("City required");
      return;
    }
    if (customer.postalCode.length === 0) {
      toast.error("Postal Code required");
      return;
    }
    if (customer.streetNumber.length === 0) {
      toast.error("Street number required");
      return;
    }
    if (customer.streetName.length === 0) {
      toast.error("Street name required");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/register/`, {
        ...customer,
      })
      .then((res) => {
        if (res.status === 201) {
          // save in localstorage: make sure to save the user type as otherwise can't access protected routes
          localStorage.setItem("email", res.data.customer.email);
          localStorage.setItem("type", "customer");
          toast.success("Registered Created Successfully");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

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
              placeholder="Date of Birth mm/dd/yyyy"
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
              <option value="Saskatchewan">Saskatchewan</option>
              <option value="Yukon">Yukon</option>
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
