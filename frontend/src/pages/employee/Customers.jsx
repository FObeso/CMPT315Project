import React, { useState, useEffect } from "react";
import EmployeeSideBar from "../../components/EmployeeSideBar";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import Input from "../../components/Input";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [customerNameFilter, setCustomerNameFilter] = useState("");

  const getCustomers = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/customer/`).then((res) => {
      console.log(res.data);
      setCustomers(res.data);
    });
  };
  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="flex flex-row w-full">
      <div>
        {" "}
        <EmployeeSideBar route={"customers"} />
      </div>
      <div className="ml-20 w-full mr-20 mt-4">
        <div className="w-1/4 my-6">
          <Input
            type="string"
            name="Customer Name"
            placeholder="Filter By Customer Name"
            value={customerNameFilter}
            handleChange={(e) => setCustomerNameFilter(e.target.value)}
          />
        </div>
        {customers.length > 0 ? (
          <>
            <Grid
              container
              spacing={2}
              className="flex mt-1 pb-3 pt-1 mb-8 items-center rounded-3xl border bg-lightgrey text-grey content-center"
            >
              <Grid item xs={1.5}>
                <div className="ml-2">Full Name</div>
              </Grid>
              <Grid item xs={1.5}>
                <div className="ml-2">Driver License</div>
              </Grid>
              <Grid item xs={2}>
                <div className="ml-2">Email</div>
              </Grid>

              <Grid item xs={2}>
                <div className="ml-2">Phone Number</div>
              </Grid>
              <Grid item xs={1.5}>
                <div className="ml-2">Date of Birth</div>
              </Grid>
              <Grid item xs={1.5}>
                <div className="ml-2">Gold Membership</div>
              </Grid>
              <Grid item xs={2}>
                <div className="ml-2">Address</div>
              </Grid>
            </Grid>
            {customers
              .filter((customer) => {
                const customerName =
                  customer.firstname + " " + customer.lastname;
                if (customerNameFilter) {
                  return customerName.startsWith(customerNameFilter);
                }
                return true;
              })
              .map((c, idx) => {
                return (
                  <Grid
                    key={c.id}
                    container
                    spacing={2}
                    style={{ border: "1px solid green" }}
                    className={`flex mb-8 pb-3 pt-1 items-center rounded-3xl border  ${
                      idx % 2 === 1 ? "bg-lightOpacity" : ""
                    }`}
                  >
                    <Grid item xs={1.5}>
                      <div className="ml-2">
                        {c.firstname} {c.lastname}
                      </div>
                    </Grid>
                    <Grid item xs={1.5}>
                      <div className="ml-2">{c.driverLicense}</div>
                    </Grid>

                    <Grid item xs={2}>
                      <div className="ml-2">{c.email}</div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="ml-2">{c.phoneNumber}</div>
                    </Grid>
                    <Grid item xs={1.5}>
                      <div className="ml-2">{c.dob}</div>
                    </Grid>
                    <Grid item xs={1.5}>
                      <div className="ml-5">{c.goldMembership.toString()}</div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="ml-2">
                        {c.streetNumber} {c.streetName}, Unit: {c.unitNumber}{" "}
                        {c.city} {c.province}, {c.postalCode}
                      </div>
                    </Grid>
                  </Grid>
                );
              })}
          </>
        ) : (
          <p>not working</p>
        )}
      </div>
    </div>
  );
};

export default Customers;
