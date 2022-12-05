import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from "react";
import "./carModal.css"
import "../../card.css";
import { useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 470,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll'
};
export default function CarModal({car, carDesc, startDate, endDate, rentalCost}) {
    
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>{
        setOpen(false);
    };
    
    const finishSelection = () => {
        localStorage.setItem("car",car);
        // navigate("/checkout");
        navigate('/checkout',{state:{carState:car, startDate: startDate, endDate: endDate}});
    } 

  useEffect(() => {
  }, []);
  
  return (
    <div>
        
        <Button 
        style={{
        borderRadius: 11,
        color:"white",
        backgroundColor: "#3B8C5D",
        padding: "12px",
        fontSize: "14px"
        }}
        onClick={handleOpen}>
            Select
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <div className="wrapper">
        <div className="one">
        
        {<div>
            <img 
                id ="carModalImage"
                src=
                {`${process.env.REACT_APP_SERVER_URL}${car.image}`}
                width="50%"
                alt={`car.image`}
            />
        </div>}
    </div>
    <div className="two">
        
            <p>{car.manufacturer}</p>
            <p>{car.model}</p>
            <p>{car.colour}</p>
            <p>{car.status}</p>
            <p>{car.mileage} kilometres</p>
            <p>{carDesc}</p>
            <p>${rentalCost}</p>
    </div>
  </div>
                
          
        <Button
        style={{
            borderRadius: 11,
            color:"white",
            backgroundColor: "#3B8C5D",
            padding: "12px",
            fontSize: "14px"
            }}
        onClick={finishSelection}
        >
            Confirm Selection</Button>
        </Box>
      </Modal>
    </div>
  );
}