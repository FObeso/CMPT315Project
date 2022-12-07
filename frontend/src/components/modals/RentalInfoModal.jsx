import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "../Input";
import useBranches from "../../hooks/useBranches";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useCustomer from "../../hooks/useCustomer";
import useCars from "../../hooks/useCars";

const RETURN_BRANCH_FEE = 80;
const LATE_FEE_PER_DAY = 65;

const RentalInfoModal = ({ open, onClose, rental, setRental }) => {
  const [branches, setBranches] = useBranches();
  const [customer, setCustomer] = useCustomer(rental.customerID);
  const [cars, setCars] = useCars();
  console.log(rental, customer);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: "60%",
    bgcolor: "background.paper",
    border: "2px solid #006639",
    boxShadow: 24,
    borderRadius: "20px",
    overflow: "auto",
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          className="text-center"
        >
          Transaction Info
        </Typography>
        <hr />
        <div className="mt-2">
          Customer Name:{" "}
          <strong>
            {customer.firstname} {customer.lastname}
          </strong>{" "}
        </div>
        <div className="mt-2">
          Car Info:{" "}
          <strong>
            {rental.carID} -{" "}
            {cars.find((car) => car.id === rental.carID)?.manufacturer}{" "}
            {cars.find((car) => car.id === rental.carID)?.model}
          </strong>{" "}
        </div>
        <div className="mt-2">
          Rental Branch name:{" "}
          <strong>
            {branches.length &&
              branches.find((branch) => branch.id === rental.rentalBranchID)
                ?.branchName}
          </strong>{" "}
        </div>
        <label htmlFor="returnBranchID">Return Branch name: </label>
        <strong>
          {branches.length &&
            branches.find((branch) => branch.id === rental.returnBranchID)
              ?.branchName}
        </strong>{" "}
        <div className="mt-2">
          Rental Date: <strong>{rental.dateFrom}</strong>{" "}
        </div>
        <div className="mt-2">
          Return Date: <strong>{rental.dateTo}</strong>{" "}
        </div>
        <div className="mt-2">
          Actual Return Date: <strong>{rental.dateReturned}</strong>{" "}
        </div>
      </Box>
    </Modal>
  );
};

export default RentalInfoModal;
