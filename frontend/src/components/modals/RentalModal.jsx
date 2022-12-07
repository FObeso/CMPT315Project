import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "../Input";
import useBranches from "../../hooks/useBranches";
import axios from "axios";
import { toast } from "react-toastify";
import useCustomer from "../../hooks/useCustomer";
import useCars from "../../hooks/useCars";
const RentalModal = ({ open, onClose, rental, setRental, transactions }) => {
  const [branches, setBranches] = useBranches();
  const [upgradeMember, setUpgradeMember] = useState(false);
  const [customer, setCustomer] = useCustomer(rental.customerID);
  const [cars, setCars] = useCars();
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

  const CheckforUpgradedMembership = () => {
    const currentYear = new Date(rental.dateFrom).getFullYear();
    const customerYealyrentals = transactions.filter((trans) => {
      const year = new Date(trans.dateFrom).getFullYear();
      return year === currentYear && trans.customerID === rental.customerID;
    });

    const yearlyCost = customerYealyrentals.reduce(
      (a, rental) => (a += Number(rental.totalCost)),
      0
    );

    if (customerYealyrentals.length >= 3 && Number(yearlyCost) >= 2000) {
      setUpgradeMember(true);
    }
  };

  useEffect(() => {
    CheckforUpgradedMembership();
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeID = localStorage.getItem("employeeID");
    if (!employeeID) {
      toast.error("Cannot find employee id");
      return;
    }
    let fromDate = new Date(rental.dateFrom);
    let toDate = new Date(rental.dateTo);
    fromDate = new Date(
      fromDate.getTime() + fromDate.getTimezoneOffset() * 60000
    );
    toDate = new Date(toDate.getTime() + toDate.getTimezoneOffset() * 60000);
    if (
      fromDate.getTime() > new Date().getTime() ||
      toDate.getTime() < new Date().getTime()
    ) {
      toast.error(
        "Cannot approve a rental transaction before the rental date or after the return date"
      );
      return;
    }

    if (upgradeMember) {
      axios
        .put(`${process.env.REACT_APP_SERVER_URL}/customer/`, {
          ...customer,
          goldMembership: true,
        })
        .then((res) => {
          if (res.status !== 200) {
            console.log(res.data);
            toast.error(res.data.message);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
          return;
        });
    }

    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/rental/`, {
        ...rental,
        rentalEmployeeID: employeeID,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Rental Transaction has been approved");
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
  console.log("customer", customer);

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
          Approve Rental Transaction
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
        <div className="mt-2">
          Rental Date: <strong>{rental.dateFrom}</strong>{" "}
        </div>
        {upgradeMember && customer.goldMembership === false && (
          <div className="text-red-500 mt-5 text-center">
            This member has more than 3 Transactions this Year that totals over
            $2000 so he will be granted Gold membership once this transaction is
            approved
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

export default RentalModal;
