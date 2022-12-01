import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import EmployeeSideBar from "../../components/EmployeeSideBar";
import DatePicker from "react-datepicker";
import Input from "../../components/Input";
import "react-datepicker/dist/react-datepicker.css";
import ReturnModal from "../../components/modals/ReturnModal";
import RentalModal from "../../components/modals/RentalModal";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [customerIdFilter, setCustomerIdFilter] = useState("");
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [rental, setRental] = useState({});

  const getTransactions = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/rental/`).then((res) => {
      console.log(res.data);
      setTransactions(res.data);
    });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const resetFilters = () => {
    setStartDate("");
    setCustomerIdFilter("");
  };

  const startApprovalProcess = (rental) => {
    setRental(rental);
    if (rental.rentalEmployeeID && rental.rentalBranchID) {
      setShowReturnModal(true);
    } else {
      setShowRentalModal(true);
    }
  };

  return (
    <div className="flex flex-row w-full">
      <div>
        {" "}
        <EmployeeSideBar route={"transactions"} />
      </div>
      <div className="ml-20 w-full mr-20 mt-4">
        {transactions.length > 0 ? (
          <>
            <div className="flex mt-1 pb-3 pt-1 mb-8 items-center rounded-md border-2 border-primaryText h-28  bg-lightgrey">
              <div className="flex flex-row items-center">
                <h3 className="font-semibold ml-3">Filter By: </h3>
                <Input
                  type="string"
                  name="Customer ID"
                  placeholder="Customer ID"
                  handleChange={(e) => setCustomerIdFilter(e.target.value)}
                />
                <div className="ml-6 mt-1 mr-2">
                  <label htmlFor="date">Transaction Date:</label>
                  <DatePicker
                    className="p-2 border-primary border rounded-md"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="ml-auto mr-6">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
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
            {transactions
              .filter((transaction) => {
                if (customerIdFilter.length > 0) {
                  return transaction.customerID.toString() === customerIdFilter;
                }
                return true;
              })
              .filter((transaction) => {
                if (startDate.toString().length > 0) {
                  let fromDate = new Date(transaction.dateFrom);
                  let toDate = new Date(transaction.dateTo);
                  fromDate = new Date(
                    fromDate.getTime() + fromDate.getTimezoneOffset() * 60000
                  );
                  toDate = new Date(
                    toDate.getTime() + toDate.getTimezoneOffset() * 60000
                  );
                  return (
                    fromDate.getTime() === startDate.getTime() ||
                    toDate.getTime() === startDate.getTime()
                  );
                }
                return true;
              })
              .map((rental, idx) => {
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
                      {!rental.returnEmployeeID ? (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => startApprovalProcess(rental)}
                        >
                          Approve{" "}
                          {rental.rentalEmployeeID ? "Return" : "Rental"}
                        </Button>
                      ) : (
                        <div className="font-bold">Processed</div>
                      )}
                    </Grid>
                  </Grid>
                );
              })}
          </>
        ) : (
          <p>hello</p>
        )}
      </div>
      <RentalModal
        open={showRentalModal}
        onClose={() => setShowRentalModal(false)}
        rental={rental}
        setRental={setRental}
      />
      <ReturnModal
        open={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        rental={rental}
        setRental={setRental}
      />
    </div>
  );
};

export default Transactions;
