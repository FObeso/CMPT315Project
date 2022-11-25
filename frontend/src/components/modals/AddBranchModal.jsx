import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "../Input";
import axios from "axios";
import { toast } from "react-toastify";

const AddBranchModal = ({ open, onClose, setBranches }) => {
    const [branch, setBranch] = useState({
        branchName: "",
        phoneNumber: "",
        province: "",
        city: "",
        postalCode: "",
        streetNumber: "",
        streetName: "",
        unitNumber: "",
    });
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
        setBranch({ ...branch, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(branch);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/employee/branches/`, {
                ...branch,
            })
            .then((res) => {
                if (res.status === 201) {
                    setBranch((prevBranch) => [...prevBranch, { ...branch }]);
                    onClose();
                    toast.success("branch Created Successfully");
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
                    Add new Branch
                </Typography>
                <hr />
                <form onSubmit={handleSubmit}>
                    <Input
                        handleChange={handleChange}
                        type="text"
                        name="branchName"
                        placeholder="Branch Name"
                    />
                    <Input
                        handleChange={handleChange}
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                    />
                    <Input
                        handleChange={handleChange}
                        type="text"
                        name="province"
                        placeholder="Province"
                    />
                    <Input
                        handleChange={handleChange}
                        type="text"
                        name="city"
                        placeholder="City"
                    />
                    <Input
                        handleChange={handleChange}
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                    />
                    <Input
                        handleChange={handleChange}
                        type="text"
                        name="streetNumber"
                        placeholder="Street Number"
                    />
                    <Input
                        handleChange={handleChange}
                        type="text"
                        name="streetName"
                        placeholder="Street Name"
                    />
                    <Input
                        handleChange={handleChange}
                        type="int"
                        name="unitNumber"
                        placeholder="Unit Number"
                    />
                    <div className="flex items-center justify-center mt-6">
                        <Button color="success" variant="contained" type="submit">
                            Add Branch
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>


    );
};

export default AddBranchModal;