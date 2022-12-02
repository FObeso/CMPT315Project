import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from "react"
import Checkbox from '@mui/material/Checkbox';
import { useRef } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll'
};

export default function BasicModal({
  colours, setColours, clrBoxes, setClrBoxes, 
  models, setModels, setMdlBoxes, mdlBoxes,
  manufacts, setManufacts, manuBoxes, setManuBoxes,
  fuelTypes, setFuelTypes, fuelBoxes, setFuelBoxes,
  carTypeDescs, setCarTypeDescs, carTypeBoxes, setCarTypeBoxes,
  setMinMile, maxMile, setMaxMile,
  cars}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

  const handleClose = () =>{
    setMinMile(Number(minMileIn.current.value));
    if( maxMileIn.current.value.toString().length > 0){
      setMaxMile(Number(maxMileIn.current.value));
    }
    setOpen(false);
  };

  const resetFilters = () =>{
    let setAllTrue = [];
    // var setAllTrueLen = 0;     
    var clrBoxesTrue = new Array(clrBoxes.length).fill(true);
    setClrBoxes(clrBoxesTrue);
    var manuBoxesTrue = new Array(manuBoxes.length).fill(true);
    setManuBoxes(manuBoxesTrue);
    var mdlBoxesTrue = new Array(mdlBoxes.length).fill(true);
    setMdlBoxes(mdlBoxesTrue);
    var fuelBoxesTrue = new Array(fuelBoxes.length).fill(true);
    setFuelBoxes(fuelBoxesTrue);
    var cTypeBoxes = new Array(carTypeBoxes.length).fill(true);
    setCarTypeBoxes(cTypeBoxes);
    var max = 0;
    for(var i = 0; i < cars.length; i++){
      //To get highest mileage
      max = Math.max(cars[i].mileage, max);
    }
    setMaxMile(max);
  }
  
  const minMileIn = useRef(null);
  const maxMileIn = useRef(null);
  
  //Creates the checkboxes
  const getFilterOptions = () => {
    var clrs = [];
    var clrsCheck = [];
    var manfct = [];
    var manfctCheck = [];
    var mdls = [];
    var mdlsCheck = [];
    var fuelTypes = [];
    var fuelCheck = [];
    var cTypeCheck = [];
    for(var i = 0; i < cars.length; i++){
      //If item not in array, add to array
      if(!clrs.includes(cars[i].colour)){
        clrs.push(cars[i].colour);
        clrsCheck.push(true);
      };
      if(!manfct.includes(cars[i].manufacturer)){
        manfct.push(cars[i].manufacturer);
        manfctCheck.push(true);
      };
      if(!mdls.includes(cars[i].model)){
        mdls.push(cars[i].model);
        mdlsCheck.push(true);
      };
      if(!fuelTypes.includes(cars[i].fuelType)){
        fuelTypes.push(cars[i].fuelType);
        fuelCheck.push(true);
      };
    }
    
    //Specific for Car Type Description
    for(var y = 0; y < carTypeDescs.length; y++){
          cTypeCheck.push(true);
    }
    
    setColours(clrs);
    setClrBoxes(clrsCheck);
    setManufacts(manfct);
    setManuBoxes(manfctCheck);
    setFuelTypes(fuelTypes);
    setFuelBoxes(fuelCheck);
    setModels(mdls);
    setMdlBoxes(mdlsCheck);
    setCarTypeDescs(carTypeDescs);
    setCarTypeBoxes(cTypeCheck);
    // console.log(carTypeBoxes);
  }

  const showCategory = (field) => {
    if(field){
      return(
        <div>
          <Box component="span" sx={{ p: 2}}>
            {field}
          </Box>
        </div>
      );
    }
  }

  //Updates the checboxes when clicked by creating new arrays
  function updateObjectInArray(e,index,arrayToUpdate,category){
    let copyArray = [...arrayToUpdate];
    copyArray[index] = !copyArray[index];
    if(category === "clrBoxes"){
      setClrBoxes(copyArray);
    }
    if(category === "manuBoxes"){
      setManuBoxes(copyArray);
    }
    if(category === "mdlBoxes"){
      setMdlBoxes(copyArray);
    }
    if(category === "fuelBoxes"){
      setFuelBoxes(copyArray);
    }
    if(category === "carTypeBoxes"){
      setCarTypeBoxes(copyArray);
    }
  };

  //Displays the checkboxes and updates them in onChange prop
  const showBoxes = (field, index, arrayToUpdate, category) => {
    return(
      <div>
        <Box component="span" sx={{ p: 2}}>
          <Checkbox
            checked= {field}
            onChange={(e) => updateObjectInArray(e,index, arrayToUpdate, category)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
      </div>
  );
  }

  useEffect(() => {
    getFilterOptions();
  }, [cars]);
  
  return (
    <div>
      <Button 
        style={{
          borderRadius: 11,
          color:"white",
          backgroundColor: "green",
          padding: "12px",
          fontSize: "14px"
        }}
        onClick={handleOpen}>Filters</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filter Options
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
              {/* COLOURS CATEGORY */}
              <p>Colours</p>
              {
                colours?.length > 0 ?
                (
                    <div className='categories'>
                        {colours.map((colour) => (
                            showCategory(colour) 
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No colours found</h2>
                    </div>
                )
            }
            {
                clrBoxes?.length > 0 ?
                (
                    <div className='categories'>
                        {clrBoxes.map((box,index) => (
                            showBoxes(box,index,clrBoxes, "clrBoxes") 
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No colours found</h2>
                    </div>
                )
            }

            {/* MANUFACTURERS CATEGORY */}
            <p>Manufacturers</p>
              {
                manufacts?.length > 0 ?
                (
                    <div className='categories'>
                        {manufacts.map((manuf, index) => (
                            showCategory(manuf)
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No manufacturers found</h2>
                    </div>
                )
            }
            {
                manuBoxes?.length > 0 ?
                (
                    <div className='categories'>
                        {manuBoxes.map((box,index) => (
                            showBoxes(box,index,manuBoxes,"manuBoxes") 
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No manufacturers found</h2>
                    </div>
                )
            }
            
            {/* MODELS CATEGORY */}
            <p>Models</p>
              {
                models?.length > 0 ?
                (
                    <div className='categories'>
                        {models.map((model, index) => (
                            showCategory(model)
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No Models found</h2>
                    </div>
                )
            }
            {
                mdlBoxes?.length > 0 ?
                (
                    <div className='categories'>
                        {mdlBoxes.map((box,index) => (
                            showBoxes(box,index,mdlBoxes,"mdlBoxes") 
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No Models found</h2>
                    </div>
                )
            }

            {/* CAR TYPES CATEGORY */}
            <p>Car Types</p>
              {
                carTypeDescs?.length > 0 ?
                (
                    <div className='categories'>
                        {carTypeDescs.map((carTypeDesc, index) => (
                            showCategory(carTypeDesc)
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No car types found</h2>
                    </div>
                )
            }
            {
                carTypeBoxes?.length > 0 ?
                (
                    <div className='categories'>
                        {carTypeBoxes.map((box,index) => (
                            showBoxes(box,index,carTypeBoxes,"carTypeBoxes") 
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No car types found</h2>
                    </div>
                )
            }

            {/* FUEL TYPES CATEGORY */}
            <p>Fuel Types</p>
              {
                fuelTypes?.length > 0 ?
                (
                    <div className='categories'>
                        {fuelTypes.map((fuelType, index) => (
                            showCategory(fuelType)
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No fuel types found</h2>
                    </div>
                )
            }
            {
                fuelBoxes?.length > 0 ?
                (
                    <div className='categories'>
                        {fuelBoxes.map((box,index) => (
                            showBoxes(box,index,fuelBoxes,"fuelBoxes") 
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No fuel types found</h2>
                    </div>
                )
            }

            {/* MILEAGE CATEGORY */}
            <div style={{ minHeight: 40 }}>
              <label className="font-semibold text-lg">
                Enter the Mileage Range:
              </label>
              <div>
                <input
                  className="border-2 rounded-md border-black"
                  ref={minMileIn}
                  type="text"
                  name="degreeName"
                  placeholder="Minimum Mileage"
                />
                <input
                  className="border-2 rounded-md border-black"
                  ref={maxMileIn}
                  type="text"
                  name="degreeName"
                  placeholder={maxMile.toString()}
                />
              </div>
            </div>
          </Typography>
          
        <Button onClick={handleClose}>Close Filters</Button>
        <Button onClick={resetFilters}>Reset Filters</Button>
        </Box>
      </Modal>
    </div>
  );
}