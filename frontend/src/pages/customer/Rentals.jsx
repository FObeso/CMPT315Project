import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import useBranches from "../../hooks/useBranches";
import DatePicker from "react-datepicker";
import { Grid } from "@mui/material";
import axios from "axios";
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


    
  function is_date_range_valid(startDate, endDate, chosenDate){

    let chosen = Date.parse(chosenDate)
    let from = Date.parse(startDate)
    let to = Date.parse(endDate)

    if((chosen <= to && chosen >= from)){
      return false
    }else{
      return true
    }  

  }
  




async function generate_avail_car_id(rented_car_list){

  let res =  await axios.get('http://127.0.0.1:8000/cars/' );
  let data = res.data;
  const length = Object.keys(data).length;
  const car_list = []


  for (let i =0; i < length; i++){

    car_list.push(data[i].id)
  }

  var availiable_cars = car_list.filter(x => rented_car_list.indexOf(x) === -1);

  localStorage.setItem('avail_cars', JSON.stringify(availiable_cars));

  const cars = JSON.parse(localStorage.getItem('avail_cars'));
  console.log(cars)
  
}




//YYYY-MM-DD format 
async function find_cars_availiable(startDate, endDate){
  let res =  await axios.get('http://127.0.0.1:8000/rental/' );
  let data = res.data;

  let rented_car_list = []

  const length = Object.keys(data).length;
  console.log(length)

 
  for (let i =0; i < length; i++){
   console.log(data[i].dateTo)
   var date_1 =  is_date_range_valid(data[i].dateFrom, data[i].dateTo, startDate)
   var date_2 =  is_date_range_valid(data[i].dateFrom, data[i].dateTo, endDate)

   if (date_1 == false && date_2 == false && data[i].rentalEmployeeID != null && data[i].rentalBranchID != null){

    rented_car_list.push(data[i].carID)

   }
   
  }

  generate_avail_car_id(rented_car_list)



}

/*  

EXAMPLE TEST FUNCTION

find_cars_availiable("2022-11-3", "2022-11-6")

*/



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
        localStorage.setItem("startDate", startDate.toISOString().split('T')[0]);
        localStorage.setItem("endDate", endDate.toISOString().split('T')[0]);
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
            <div>dateFrom: {startDate.toISOString().split('T')[0]} dateTo: {endDate.toISOString().split('T')[0]}</div>
        </div>
    )
};

export default Rentals;