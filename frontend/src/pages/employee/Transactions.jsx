import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import EmployeeSideBar from "../../components/EmployeeSideBar";
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/rental/`).then((res) => {
      console.log(res.data);
      setTransactions(res.data);
    });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="flex flex-row w-full">
      <div>
        {" "}
        <EmployeeSideBar route={"Transactions"} />
      </div>
      <div className="ml-20 w-full mr-20 mt-4">
        {transactions.length > 0 ? (
          <>
            <Grid
              container
              spacing={2}
              className="flex mt-1 pb-3 pt-1 mb-8 items-center rounded-3xl border bg-lightgrey text-grey content-center"
            >
              <Grid item xs={2}>
                <div>Customer ID</div>
              </Grid>
              <Grid item xs={2}>
                <div>Date From</div>
              </Grid>
              <Grid item xs={2}>
                <div>Date To</div>
              </Grid>

              <Grid item xs={2}>
                <div>Date returned</div>
              </Grid>
              <Grid item xs={2}>
                <div>total Cost</div>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
            {transactions.map((rental, idx) => {
              return (
                <Grid
                  key={rental.id}
                  container
                  spacing={2}
                  className={`flex mb-8 pb-3 pt-1 items-center rounded-3xl border  ${
                    idx % 2 === 1 ? "bg-lightOpacity" : ""
                  }`}
                >
                  <Grid item xs={2}>
                    <div className="ml-6">{rental.customerID}</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>{rental.dateFrom}</div>
                  </Grid>

                  <Grid item xs={2}>
                    <div>{rental.dateTo}</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div className="ml-6">
                      {rental.dateReturned ? rental.dateReturned : "N/A"}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>{rental.totalCost}</div>
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="contained" color="success">
                      Approve
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
          </>
        ) : (
          <p>hello</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
