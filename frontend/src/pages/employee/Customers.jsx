import React, { useState, useEffect } from "react";
import EmployeeSideBar from "../../components/EmployeeSideBar";
import { Button, Grid } from "@mui/material";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

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
        <EmployeeSideBar route={"Customers"} />
      </div>
      <div className="ml-20 w-full mr-20 mt-4">
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
            {customers.map((c, idx) => {
              return (
                <Grid
                  key={c.id}
                  container
                  spacing={2}
                  className={`flex mb-8 pb-3 pt-1 items-center rounded-3xl border  ${idx % 2 === 1 ? "bg-lightOpacity" : ""
                    }`}
                >
                  <Grid item xs={1.5}>
                    <div className="ml-2">{c.firstname} {c.lastname}</div>
                  </Grid>
                  <Grid item xs={1.5}>
                    <div className="ml-2">{c.driverLicense}</div>
                  </Grid>

                  <Grid item xs={2}>
                    <div className="ml-2">{c.email}</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div className="ml-2">
                      {c.phoneNumber}
                    </div>
                  </Grid>
                  <Grid item xs={1.5}>
                    <div className="ml-2">
                      {c.dob}
                      </div>
                  </Grid>
                  <Grid item xs={1.5}>
                    <div className="ml-5">
                      {c.goldMembership.toString()}
                      </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div className="ml-2">
                      {c.streetNumber} {c.streetName}, Unit: {c.unitNumber} {c.city} {c.province}, {c.postalCode}
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
