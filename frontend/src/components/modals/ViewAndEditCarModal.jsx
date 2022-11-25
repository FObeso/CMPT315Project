import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "../Input";
import useCarTypes from "../../hooks/useCarTypes";
import useBranches from "../../hooks/useBranches";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteItemModal from "./DeleteItemModal";

const ViewAndEditCarModal = ({
  currentCar,
  open,
  onClose,
  setCars,
  setCurrentCar,
}) => {
  const [carTypes, setCarTypes] = useCarTypes();
  const [branches, setBranches] = useBranches();
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #006639",
    boxShadow: 24,
    borderRadius: "20px",
    overflow: "auto",
    p: 4,
  };

  const handleChange = (e) => {
    setCurrentCar({ ...currentCar, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/cars/${currentCar.id}`, {
        ...currentCar,
      })
      .then((res) => {
        if (res.status === 200) {
          setCars((prevCars) => {
            let carsCopy = [...prevCars];
            carsCopy = prevCars.map((car) => {
              if (car.id === currentCar.id) {
                return { ...currentCar };
              }
              return car;
            });
            return carsCopy;
          });
          setDisabled(true);
          onClose();
          toast.success("Car Updated Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const deleteCar = (option) => {
    if (option === true) {
      axios
        .delete(`${process.env.REACT_APP_SERVER_URL}/cars/${currentCar.id}`)
        .then((res) => {
          if (res.status === 204) {
            setCars((prevCars) => {
              let carsCopy = [...prevCars];
              carsCopy = prevCars.filter((car) => car.id !== currentCar.id);
              return carsCopy;
            });
            setDisabled(true);
            onClose();
            toast.success("Car Deleted Successfully");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
    setShowDeleteItemModal(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-row justify-between mb-2">
            <Button
              color="error"
              variant="contained"
              type="submit"
              onClick={() => setShowDeleteItemModal(true)}
            >
              Delete Car
            </Button>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="text-center"
            >
              Car Info
            </Typography>
            {disabled ? (
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                onClick={() => setDisabled(false)}
              >
                Edit Car
              </Button>
            ) : (
              <div></div>
            )}
          </div>
          <hr />
          <form onSubmit={handleSubmit}>
            <Input
              handleChange={handleChange}
              type="text"
              name="manufacturer"
              placeholder="Manufacturer"
              disabled={disabled}
              value={currentCar.manufacturer}
            />
            <Input
              handleChange={handleChange}
              type="text"
              name="model"
              placeholder="Enter Model"
              disabled={disabled}
              value={currentCar.model}
            />
            <Input
              handleChange={handleChange}
              type="text"
              name="colour"
              placeholder="Enter Colour"
              value={currentCar.colour}
              disabled={disabled}
            />
            <label htmlFor="status">Enter Car Status: </label>
            {disabled ? (
              <input
                type="text"
                value={currentCar.status}
                disabled={disabled}
                className="w-52 m-2 mt-5 p-2 border rounded-md border-primary"
              />
            ) : (
              <select
                name="status"
                disabled={disabled}
                onChange={handleChange}
                className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
              >
                <option value=""></option>
                <option value="available">Available</option>
                <option value="available">Rented</option>
              </select>
            )}
            <label htmlFor="status">Enter Fuel Type: </label>
            {disabled ? (
              <input
                type="text"
                value={currentCar.fuelType}
                disabled={disabled}
                className="w-52 m-2 mt-5 p-2 border rounded-md border-primary"
              />
            ) : (
              <select
                name="fuelType"
                onChange={handleChange}
                className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
              >
                <option value=""></option>
                <option value="gas">Gas</option>
                <option value="diesel">Diesel</option>
              </select>
            )}
            <Input
              handleChange={handleChange}
              type="text"
              disabled={disabled}
              value={currentCar.licensePlate}
              name="licensePlate"
              placeholder="Enter License Plate #"
            />
            <Input
              handleChange={handleChange}
              type="number"
              name="mileage"
              disabled={disabled}
              value={currentCar.mileage}
              placeholder="Enter Car mileage"
            />
            <label htmlFor="typeID">Enter Car Type: </label>
            {disabled ? (
              <input
                type="text"
                value={
                  carTypes.find((type) => type.id === currentCar.typeID)
                    ?.description
                }
                disabled={disabled}
                className="w-52 m-2 mt-5 p-2 border rounded-md border-primary"
              />
            ) : (
              <select
                name="typeID"
                disabled={disabled}
                onChange={handleChange}
                className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
              >
                <option value=""></option>
                {carTypes.map((type) => (
                  <option value={type.id} key={type.id}>
                    {type.description}
                  </option>
                ))}
              </select>
            )}
            <label htmlFor="BranchID">Enter Branch name: </label>
            {disabled ? (
              <input
                type="text"
                disabled={disabled}
                className="w-52 m-2 mt-5 p-2 border rounded-md border-primary"
                value={currentCar.BranchID}
              />
            ) : (
              <select
                name="BranchID"
                onChange={handleChange}
                disabled={disabled}
                className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
              >
                <option value=""></option>
                {branches.map((branch) => (
                  <option value={branch.id} key={branch.id}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            )}
            <div className="flex items-center justify-center mt-6">
              <Button color="success" variant="contained" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      <DeleteItemModal
        open={showDeleteItemModal}
        onClose={() => setShowDeleteItemModal(false)}
        item={"car"}
        handleOption={deleteCar}
      />
    </>
  );
};

export default ViewAndEditCarModal;
