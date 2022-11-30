import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal, { modalClasses } from "@mui/material/Modal";
import Input from "../Input";
import useCars from "../../hooks/useCars";
import useCustomers from "../../hooks/useCustomers";
import axios from "axios";
import { toast } from "react-toastify";

const AddDamagesModal = ({ open, onClose, setDamages }) => {
    const [damage, setDamage] = useState({
        damageDate: "",
        description: "",
        damageCost: "",
        image: "",
        customerID: "",
        carID: "",
    });
    const [customer, setCustomer] = useState({
        id: "",
        firstname: "",
        lastname: "",
    })
    const [car, setCar] = useState({
        id: "",
        manufacturer: "",
        model: "",
    })
    const [cars, setCars] = useCars();
    const [customers, setCustomers] = useCustomers();
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
        setDamage({ ...damage, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        setDamage({ ...damage, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        const formData = new FormData();
        for (let key in damage) {
            if (key === "image") {
                formData.append(key, damage[key], damage[key]?.name);
            } else {
                formData.append(key, damage[key]);
            }
        }
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/damages/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (res.status === 201) {
                    setDamages((prevDamages) => [...prevDamages, { ...damage }]);
                    onClose();
                    toast.success("Damage Created Successfully");
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
                    Add a New Damage
                </Typography>
                <hr />
                <form onSubmit={handleSubmit}>
                    <Input
                        handleChange={handleChange}
                        type="text"
                        name="damageDate"
                        placeholder="Date mm/dd/yyyy"
                    />
                    <Input
                        handleChange={handleChange}
                        type="textarea"
                        name="description"
                        placeholder="Description"
                    />
                    <Input
                        handleChange={handleChange}
                        type="number"
                        name="damageCost"
                        placeholder="Cost"
                    />
                    <label htmlFor="carID">Enter Car ID: </label>
                    <select
                        name="carID"
                        onChange={handleChange}
                        className="w-60 m-2 mt-5 p-2 border rounded-md border-primary "
                    >
                        <option value=""></option>
                        {cars.map((car) => (
                            <option value={car.id} key={car.id}>
                                ID: {car.id}, Model: {car.manufacturer} {car.model}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="customerID">Enter Customer: </label>
                    <select
                        name="customerID"
                        onChange={handleChange}
                        className="w-60 m-2 mt-5 p-2 border rounded-md border-primary "
                    >
                        <option value=""></option>
                        {customers.map((customer) => (
                            <option value={customer.id} key={customer.id}>
                                ID: {customer.id}, Name: {customer.firstname} {customer.lastname}
                            </option>
                        ))}
                    </select>
                    <div>
                        <label htmlFor="CustomerID">Add Damage Image: </label>
                        <input
                            type="File"
                            className=" border-primary "
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <Button color="success" variant="contained" type="submit">
                            Add Damage
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default AddDamagesModal;
