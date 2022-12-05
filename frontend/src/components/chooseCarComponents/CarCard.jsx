import React from "react";
import CarModal from "./CarModal";
import axios from "axios";
import { useState } from "react";

const CarCard = ({car, carTypeIDs, carTypeDescs}) => {
    
    const [rentalCost, setRentalCost] = useState()
    // const startDate = '2022-01-09';
    // const endDate = '2022-01-18';
    
  const startDate = localStorage.getItem("startDate");
  
  const endDate = localStorage.getItem("endDate");
    const picAlt = car.manufacturer + " " + car.model;
    const getType = (cartypeID) => {
        for(var i =0; i < carTypeIDs.length; i++){
            if(cartypeID === carTypeIDs[i]){
                
                return(carTypeDescs[i]);
            }
        }
        return ("Car type not found");
    }
    async function rental_cost_helper(typeId){

        let res = await axios.get('http://127.0.0.1:8000/carType/' );
        let data = res.data;
        const length = Object.keys(data).length;
      
        for (let i =0; i < length; i++){
            
            if (data[i].id == typeId){
                // console.log("Days, Weeks, Months: Rates", data[i].dailyCost, data[i].weeklyCost, data[i].monthlyCost)
      
                return [data[i].dailyCost,  data[i].weeklyCost,  data[i].monthlyCost]
            }
        }
      }
      
    
        async function get_car_rates(id) {
    
       let res = await axios.get('http://127.0.0.1:8000/cars/' + id)
       let data = res.data
       let typeID = data.typeID
    
       return rental_cost_helper(typeID)
      
        }
    
    
        // a and b are javascript Date objects
    function date_diff_days(a, b) {
      const ms_per_day = 1000 * 60 * 60 * 24;
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    
      return Math.floor((utc2 - utc1) / ms_per_day);
    }
    
      
    
    calc_rental_cost(car.id, startDate, endDate)
    
    //YYYY-DD-MM format for dates must be a string
    //Returns the best cost to the user based on algo
    async function calc_rental_cost(carId, startDate, endDate){
    
      //gets the diff of days
      var days = date_diff_days(new Date(startDate), new Date(endDate));
    
      //calculates months, weeks, days
      var months = parseInt(days / 30);
      days = days - months * 30;
      var weeks = parseInt(days / 7);
      days = days - weeks * 7;
      console.log("days, weeks, months: Rental", days, weeks, months)
    
      //list of rates for car [days, weeks, months]
      const rate_list = await get_car_rates(carId)
    
      var calc = (rate_list[0] * days) + (rate_list[1] * weeks) + (rate_list[2] * months)
    
      setRentalCost(calc)
    
      return parseInt(calc)
    }
    


    const carDesc = getType(car.typeID);
    return(
        <div>
            <div className='car'>
                <div>
                    <h3>{car.id}</h3>
                </div>
                <div id="carImage">
                    <img src=
                    {`${process.env.REACT_APP_SERVER_URL}${car.image}`}
                        width="70%"
                        alt={picAlt}
                    />
                </div>
                <div>
                    <p>{car.manufacturer}</p>
                    
                    <p>{car.model}</p>
                    
                    <p>{car.colour}</p>

                    <p>{car.status}</p>

                    <p>{car.mileage} kilometres</p>

                    <p>${rentalCost}</p>
                </div>
                
                <div>
            
                </div>
            </div>
            <div id="carButton">
                <CarModal 
                    car = {car}
                    carDesc = {carDesc}
                    startDate = {startDate}
                    endDate = {endDate}
                    rentalCost = {rentalCost}
                />
            </div>
        </div>
    )

}
export default CarCard;