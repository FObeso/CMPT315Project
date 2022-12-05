import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import useBranches from "../../hooks/useBranches";
import DatePicker from "react-datepicker";
import Input from "../../components/Input";
import ButtonStyles from "../../styles/Login.module.css";

const Rentals = () => {
    const [pageVal, setPageVal] = useState({
        branchID: "",
        dateFrom: "",
        dateTo: "",
    })
    const [branches, setBranches] = useBranches();

    const style = {
        position: "absolute",
        top: "55%",
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
        setPageVal({ ...pageVal, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(pageVal.branchID.length === 0){
            toast.error("Branch required");
            return;
        }
        if(pageVal.dateFrom.length === 0){
            toast.error("DateFrom required");
            return;
        }
        if(pageVal.branchID.length === 0){
            toast.error("DateTo required");
            return;
        }

    }
    return (
        <div>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <div style={{ width: "700" }}>


                        <select
                            name="branchID"
                            onChange={handleChange}
                            className="w-80 m-2 mt-5 p-2 border rounded-md border-primary "
                        >
                            <option value=""></option>
                            {branches.map((branch) => (
                                <option value={branch.id} key={branch.id}>
                                    {branch.id} {branch.branchName}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <Input
                        handleChange={handleChange}
                        type="text"
                        name="dateFrom"
                        placeholder="Start Date mm/dd/yyyy"
                        sx={6}
                    >
                    </Input>
                    
                    <Input
                        handleChange={handleChange}
                        type="text"
                        name="dateTo"
                        placeholder="End Date mm/dd/yyyy"
                        sx={6}
                    >
                    </Input>
                    <div className="flex items-center justify-center mt-6">
                    <Button color="success" variant="contained" type="submit">
                        Find Availability 
                    </Button>
                    </div>
                </form>
            </Box>
            <div>Info u need: branchID:{pageVal.branchID} dateFrom:{pageVal.dateFrom} dateTo:{pageVal.dateTo}</div>
        </div>
    )
};

export default Rentals;