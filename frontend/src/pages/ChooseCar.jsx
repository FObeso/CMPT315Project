import axios from "axios";
import React, { useState, useEffect } from "react";
import CarCard from "../components/chooseCarComponents/CarCard";
import "../card.css";

import FilterModal from "../components/chooseCarComponents/FilterModal";
import useCarTypes from "../hooks/useCarTypes";

const ChooseCar = () => {
  const [cars, setCars] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [colours, setColours] = useState([]);
  const [clrBoxes, setClrBoxes] = useState([]);
  const [models, setModels] = useState([]);
  const [mdlBoxes, setMdlBoxes] = useState([]);
  const [manufacts, setManufacts] = useState([]);
  const [manuBoxes, setManuBoxes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [fuelBoxes, setFuelBoxes] = useState([]);
  const [carTypes, setCarTypes] = useCarTypes();//This is from hook
  const [carTypeIDs, setCarTypeIDs] = useState([]);
  const [carTypeDescs, setCarTypeDescs] = useState([]);
  const [carTypeBoxes, setCarTypeBoxes] = useState([]);
  const [minMile, setMinMile] = useState(0);
  const [maxMile, setMaxMile] = useState(0);
  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");
  const branchID = localStorage.getItem("branchID");
  //Car Data from branch populates filter
  // const getCars = () => {
  //   const availCars = [];
  //   axios.get(`${process.env.REACT_APP_SERVER_URL}/cars/`).then((res) => {
  //     setCars(res.data);
  //   });
    
  //   find_cars_available(endDate, startDate);
  // };
  
  const createCarTypes = () => {
    var cTypeIDs = [];
    var cDesc = [];
    var carTypesIDAvail = [];
    var max = 0;
    for(var i = 0; i < cars.length; i++){
      //This is for car types
      if(!carTypesIDAvail.includes(cars[i].typeID)){
        carTypesIDAvail.push(cars[i].typeID);
      }
      //To get highest mileage
      max = Math.max(cars[i].mileage, max);
    }
    for(var x = 0; x < carTypes.length; x++){
      if(carTypesIDAvail.includes(carTypes[x].id)){
        cTypeIDs.push(carTypes[x].id);
        cDesc.push(carTypes[x].description);
      }
    }
    setMaxMile(max);
    setCarTypeIDs(cTypeIDs);
    setCarTypeDescs(cDesc);
  };
    
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
  let carList = res.data;
  const length = Object.keys(carList).length;
  const car_list = [];
  const availCars = [];
  for (let i =0; i < length; i++){
    car_list.push(carList[i].id)
  }
  var availiable_cars = car_list.filter(x => rented_car_list.indexOf(x) === -1);
  // localStorage.setItem('avail_cars', JSON.stringify(availiable_cars));
  // const carsAvail = JSON.parse(localStorage.getItem('avail_cars'));
  setAvailableCars(availiable_cars);
  for(var i = 0; i < availiable_cars.length; i++){
    for(var j = 0; j < carList.length; j++){
      if((availiable_cars[i] === carList[j].id) && (carList[j].BranchID === parseInt(branchID))){
        availCars.push(carList[j]);
      }
    }
  }
  setCars(availCars);
}

//YYYY-MM-DD format 
async function find_cars_available(startDate, endDate){
  let res =  await axios.get('http://127.0.0.1:8000/rental/' );
  let data = res.data;
  let rented_car_list = []

  const length = Object.keys(data).length;
  for (let i =0; i < length; i++){
   var date_1 =  is_date_range_valid(data[i].dateFrom, data[i].dateTo, startDate)
   var date_2 =  is_date_range_valid(data[i].dateFrom, data[i].dateTo, endDate)
   if (date_1 == false && date_2 == false ){
    // && data[i].rentalEmployeeID != null && data[i].rentalBranchID != null
    rented_car_list.push(data[i].carID)
   }
  }
  generate_avail_car_id(rented_car_list);
  

}

  // EXAMPLE TEST FUNCTION
  
  //Should run on first render only
  useEffect(() => {
    find_cars_available(endDate, startDate);
    console.log(cars);
  }, []);

  useEffect(() => {
    createCarTypes();
  }, [cars]);

  return (
  <div>
      <h1 className="heading">Cars Available</h1>
      <FilterModal
        cars = {cars}
        colours={colours}
        setColours = {setColours}
        clrBoxes = {clrBoxes}
        setClrBoxes = {setClrBoxes}
        models = {models}
        setModels = {setModels}
        mdlBoxes = {mdlBoxes}
        setMdlBoxes = {setMdlBoxes}
        manufacts = {manufacts}
        setManufacts = {setManufacts}
        manuBoxes = {manuBoxes}
        setManuBoxes = {setManuBoxes}
        fuelTypes = {fuelTypes}
        setFuelTypes = {setFuelTypes}
        fuelBoxes = {fuelBoxes}
        setFuelBoxes = {setFuelBoxes}
        carTypeIDs = {carTypeIDs}
        setCarTypeIDs = {setCarTypeIDs}
        carTypeDescs = {carTypeDescs}
        setCarTypeDescs = {setCarTypeDescs}
        carTypeBoxes = {carTypeBoxes}
        setCarTypeBoxes = {setCarTypeBoxes}
        setMinMile = {setMinMile}
        maxMile = {maxMile}
        setMaxMile = {setMaxMile}
      />
      {
          //This is to deal with empty arrays/ no cars found
          cars?.length > 0 ?
          (
            <div className='container'>
              {cars
              .filter((car) => {
                var trueColours = [];
                for(var i = 0; i < clrBoxes.length; i++){
                  if(clrBoxes[i] === true){
                    trueColours.push(colours[i]);
                  } 
                }
                return trueColours.includes(car.colour)
              })
              .filter((car) => {
                var trueModels = [];
                for(var j = 0; j < mdlBoxes.length; j++){
                  if(mdlBoxes[j] === true){
                    trueModels.push(models[j]);
                  } 
                }
                return trueModels.includes(car.model);
              })
              .filter((car) => {
                var trueManufacts = [];
                for(var j = 0; j < manuBoxes.length; j++){
                  if(manuBoxes[j] === true){
                    trueManufacts.push(manufacts[j]);
                  } 
                }
                return trueManufacts.includes(car.manufacturer);
              })
              .filter((car) => {
                var trueFuelTypes = [];
                for(var j = 0; j < fuelBoxes.length; j++){
                  if(fuelBoxes[j] === true){
                    trueFuelTypes.push(fuelTypes[j]);
                  } 
                }
                return trueFuelTypes.includes(car.fuelType);
              })
              .filter((car) => {
                var trueCarTypes = [];
                for(var j = 0; j < carTypeBoxes.length; j++){
                  if(carTypeBoxes[j] === true){
                    trueCarTypes.push(carTypeIDs[j]);
                  } 
                }
                return trueCarTypes.includes(car.typeID);
              })
              .filter((car) => {
                return (car.mileage >= minMile) && (car.mileage <= maxMile);
              })
              .map((car) => (
                <CarCard 
                  car = {car}
                  carTypeIDs = {carTypeIDs}
                  carTypeDescs = {carTypeDescs}
                />
              ))
              }
              {/* {
              cars.map((car) => (
                  <CarCard car = {car} 
                  finishSelection = {finishSelection}
                  />
              ))} */}
            </div>
          ) : (
              <div className='empty'>
                  <h2>No car found</h2>
              </div>
          )
      }
    
  </div>
  )
}
export default ChooseCar