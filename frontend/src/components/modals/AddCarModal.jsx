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
const AddCarModal = ({ open, onClose, setCars }) => {
  const [car, setCar] = useState({
    manufacturer: "",
    model: "",
    fuelType: "",
    colour: "",
    licensePlate: "",
    status: "",
    mileage: "",
    typeID: "",
    BranchID: "",
  });
  const [carTypes, setCarTypes] = useCarTypes();
  const [branches, setBranches] = useBranches();
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
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(car);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/cars/`, {
        ...car,
      })
      .then((res) => {
        if (res.status === 201) {
          setCars((prevCars) => [...prevCars, { ...car }]);
          onClose();
          toast.success("Car Created Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
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
          Add a New Car
        </Typography>
        <hr />
        <form onSubmit={handleSubmit}>
          <Input
            handleChange={handleChange}
            type="text"
            name="manufacturer"
            placeholder="Manufacturer"
          />
          <Input
            handleChange={handleChange}
            type="text"
            name="model"
            placeholder="Enter Model"
          />
          <Input
            handleChange={handleChange}
            type="text"
            name="colour"
            placeholder="Enter Colour"
          />
          <label htmlFor="status">Enter Car Status: </label>
          <select
            name="status"
            onChange={handleChange}
            className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
          >
            <option value=""></option>
            <option value="available">Available</option>
            <option value="available">Rented</option>
          </select>
          <label htmlFor="status">Enter Fuel Type: </label>
          <select
            name="fuelType"
            onChange={handleChange}
            className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
          >
            <option value=""></option>
            <option value="gas">Gas</option>
            <option value="diesel">Diesel</option>
          </select>
          <Input
            handleChange={handleChange}
            type="text"
            name="licensePlate"
            placeholder="Enter License Plate #"
          />
          <Input
            handleChange={handleChange}
            type="number"
            name="mileage"
            placeholder="Enter Car mileage"
          />
          <label htmlFor="typeID">Enter Car Type: </label>
          <select
            name="typeID"
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
          <label htmlFor="BranchID">Enter Branch name: </label>
          <select
            name="BranchID"
            onChange={handleChange}
            className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
          >
            <option value=""></option>
            {branches.map((branch) => (
              <option value={branch.id} key={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          <div className="flex items-center justify-center mt-6">
            <Button color="success" variant="contained" type="submit">
              Add Car
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCarModal;
