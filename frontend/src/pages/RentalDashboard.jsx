import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import useBranches from "../hooks/useBranches";
// import { Button } from "react-bootstrap/lib/InputGroup";
import Form from 'react-bootstrap/Form';

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");
  const userType = localStorage.getItem("type");
  const [selectedDatePick, setSelectedDatePick] = useState("");
  const [selectedDateReturn, setSelectedDateReturn] = useState("");
  const [branches, setBranches] = useBranches(); //getting branches from usebranches hook
  const [currentBranchID, setCurrentBranchID] = useState([]);


  useEffect(() => {
    if (
      !userEmail ||
      userEmail.length === 0 ||
      !userType ||
      userType.toLowerCase() !== "customer"
    ) {
      navigate("/login/");
    }
  }, [navigate]);

  const handleSubmit = ( () => {
    //alert("clicked");
    navigate("/cars");
    console.log(currentBranchID);
    console.log(selectedDatePick);
    console.log(selectedDateReturn);
  })

  return (
    <div>
      <div>
      <h5>* Required Field</h5>
        <select
          name="BranchID"
          className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
          onChange={(e) => setCurrentBranchID(e.target.value)}
        >
          <option value="">All Branches*</option>
          {branches.map((branch) => (
            <option value={branch.id} key={branch.id}>
              {branch.branchName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="ml-6 mt-1 mr-2">
          <label htmlFor="date">Pick-up Date*</label>
          <DatePicker
            className="p-2 border-primary border rounded-md" 
            selected={selectedDatePick}
            onChange={date => setSelectedDatePick(date)}
            dateFormat='yyyy-mm-dd'
          />
        </div>
        <div className="ml-6 mt-1 mr-2">
          <label htmlFor="date">Return Date*</label>
          <DatePicker
            className="p-2 border-primary border rounded-md" 
            selected={selectedDateReturn}
            onChange={date => setSelectedDateReturn(date)}
            dateFormat='yyyy-mm-dd'
          />
        </div>
      </div>

      <div className="ml-auto mr-6">
        {/* <Button
          variant="contained"
          color="secondary" 
          onClick={handleSubmit}
        >
        Check Availability
        </Button> */}
      </div>
      
    </div>
    );
};

export default Dashboard;
