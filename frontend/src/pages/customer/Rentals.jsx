import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import useBranches from "../../hooks/useBranches";
import DatePicker from "react-datepicker";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css'

const Rentals = () => {

        
    const navigate = useNavigate();
    const [pageVal, setPageVal] = useState({
        branchID: "",
    });

    const [branches, setBranches] = useBranches();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


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

    const getAvail = () => {
        localStorage.setItem("startDate", startDate.toLocaleDateString().replaceAll('/','-'));
        localStorage.setItem("endDate", endDate.toLocaleDateString().replaceAll('/','-'));
        navigate('/cars/');
    }
    const handleChange = (e) => {
        setPageVal({ ...pageVal, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (pageVal.branchID.length === 0) {
            toast.error("Branch required");
            return;
        }

    }
    return (
        <div>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <div style={{ width: "700" }}>

                        <p>Select Branch</p>
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
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={6}>
                            <label htmlFor="date">Pick-up Date</label>
                                <div>
                                <DatePicker
                                      style={{
                                        backgroundColor: "aliceblue",
                                        height: "24px",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        padding: "3px 10px"
                                      }}
                                    selected={startDate}
                                    dateFormat="yyyy-MM-dd"
                                    onChange={(date) => setStartDate(date)}
                                />
                                </div>

                        </Grid>
                        <Grid item xs={6}>
                            <label htmlFor="date">Drop-off Date</label>
                            <DatePicker
                                selected={endDate}
                                dateFormat="yyyy-MM-dd"
                                onChange={(date) => setEndDate(date)}
                            />
                        </Grid>
                    </Grid>
                    <div className="flex items-center justify-center mt-6">
                        <Button 
                            color="success" 
                            variant="contained" 
                            type="submit"
                            onClick = {getAvail}>
                            Find Availability
                        </Button>
                    </div>
                </form>
            </Box>
            <div>Info u need: branchID:{pageVal.branchID} </div>
            <div>dateFrom: {startDate.toLocaleDateString().replaceAll('/','-')} dateTo: {endDate.toLocaleDateString().replaceAll('/','-')   }</div>
        </div>
    )
};

export default Rentals;