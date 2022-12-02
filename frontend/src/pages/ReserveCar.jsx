import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/Input"
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import { Checkbox } from "react-bootstrap";
import useBranches from "../hooks/useBranches";
import { Button } from "react-bootstrap/lib/InputGroup";

const ReserveCar = () => {
  const navigate = useNavigate();
  const [selectedDatePick, setSelectedDatePick] = useState(null);
  const [selectedDateReturn, setSelectedDateReturn] = useState(null);
  const [branches, setBranches] = useBranches(); //getting branches from usebranches hook
  const [currentBranch, setCurrentBranch] = useState([]);

  const handleSubmit = (c) => {
    alert("navigate to cars page");
    //navigate("/cars");
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div>
        <h5>* Required Field</h5>
        <Form.Select
            onChange={setCurrentBranch} 
            aria-label="Select Branch"
        >
            <option>Choose a branch*</option>
            {branches.map((branch, idx) => {
                return (
                  <option value={idx}>{branch.branchName}</option>
                );
            })}
        </Form.Select>
      </div>
      <div>
        <FormGroup>
            <ControlLabel>Pick-up*</ControlLabel>
            <DatePicker 
                selected={selectedDatePick}
                onChange={date => setSelectedDatePick(date)}
                dateFormat='yyyy/MM/dd'
             />
        </FormGroup>
        <FormGroup>
            <ControlLabel>Return*</ControlLabel>
            <DatePicker 
                selected={selectedDateReturn}
                onChange={date => setSelectedDateReturn(date)}
                dateFormat='yyyy/MM/dd'
             />
        </FormGroup>
      </div>

        <Button 
          onClick={handleSubmit}
        >
          Check Availability
        </Button>
        
    </div>
  );
};

export default ReserveCar;

/*
      <Form>
        <Form.Check 
            type="switch"
            id="custom-switch"
            label="Manufacturer"
            
        />
         <Form.Check 
            type="switch"
            id="custom-switch"
            label="Mileage"
        />
         <Form.Check 
            type="switch"
            id="custom-switch"
            label="Fuel type"
        />
        </Form> */