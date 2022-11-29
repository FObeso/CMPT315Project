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

const RETURN_BRANCH_FEE = 80;
const LATE_FEE_PER_DAY = 65;

const ReturnModal = ({ open, onClose, rental, setRental }) => {
  const [branches, setBranches] = useBranches();
  const [customer, setCustomer] = useCustomer(rental.customerID);
  const [lateFee, setLateFee] = useState(false);
  const [returnBranchFeeCheck, setReturnBranchFeeCheck] = useState(false);
  const today = new Date();
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

  useEffect(() => {
    let toDate = new Date(rental.dateTo);
    toDate = new Date(toDate.getTime() + toDate.getTimezoneOffset());

    toDate.setDate(toDate.getDate() + 1);
    if (toDate.getTime() < today.getTime()) {
      setLateFee(today.getDate() - toDate.getDate());
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let totalCost = rental.totalCost;
    if (returnBranchFeeCheck) {
      totalCost += RETURN_BRANCH_FEE;
    }

    if (lateFee) {
      totalCost += lateFee * LATE_FEE_PER_DAY;
    }
    const employeeID = localStorage.getItem("employeeID");
    if (!employeeID) {
      toast.error("Cannot find employee id");
      return;
    }
    if (rental.returnBranchID.length === 0) {
      toast.error("Please select a return branch");
      return;
    }

    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/rental/`, {
        ...rental,
        returnEmployeeID: employeeID,
        totalCost: totalCost,
        dateReturned: today.toISOString().slice(0, 10),
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(
            `Return Transaction has been approved, the Total Charge for the Customer is now $${totalCost}.`
          );
          onClose();
        } else {
          console.log(res.data);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleBranchChange = (e) => {
    setRental({ ...rental, [e.target.name]: Number(e.target.value) });
  };

  useEffect(() => {
    if (
      rental.rentalBranchID !== rental.returnBranchID &&
      !rental.goldMembership
    ) {
      setReturnBranchFeeCheck(true);
    } else {
      setReturnBranchFeeCheck(false);
    }
  }, [rental]);

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
          Approve Return Transaction
        </Typography>
        <hr />
        <div className="mt-2">
          Rental Branch name:{" "}
          <strong>
            {branches.length &&
              branches.find((branch) => branch.id === rental.rentalBranchID)
                ?.branchName}
          </strong>{" "}
        </div>
        <label htmlFor="returnBranchID">Return Branch name: </label>
        <select
          name="returnBranchID"
          onChange={handleBranchChange}
          className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
        >
          <option value=""></option>
          {branches.map((branch) => (
            <option value={branch.id} key={branch.id}>
              {branch.branchName}
            </option>
          ))}
        </select>
        <div className="mt-2">
          Rental Date: <strong>{rental.dateFrom}</strong>{" "}
        </div>
        <div className="mt-2">
          Return Date: <strong>{rental.dateTo}</strong>{" "}
        </div>
        <div className="mt-2">
          Actual Return Date:{" "}
          <strong>{today.toISOString().slice(0, 10)}</strong>{" "}
        </div>
        {lateFee && (
          <div className="text-red-500 mt-5 text-center">
            The return date is after the scheduled return date. The customer
            will be Charged a late fee of ${LATE_FEE_PER_DAY * lateFee} once
            this transaction is approved
          </div>
        )}
        {returnBranchFeeCheck && !customer.goldMembership && (
          <div className="text-red-500 mt-5 text-center">
            The Return Branch is not the same as the Rental Branch. The customer
            will be Charged a fee of ${RETURN_BRANCH_FEE} once this transaction
            is approved
          </div>
        )}
        <div className="fixed bottom-5 left-80 ml-8">
          <Button color="success" variant="contained" onClick={handleSubmit}>
            APPROVE
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ReturnModal;
