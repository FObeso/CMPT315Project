import React, { Component } from "react";
import CarInfo from "../../components/CarInfo"
import axios from "axios";
import { useState } from "react";

const RentConfirmation = () => {

  const [rentalCost, setRentalCost] = useState()

  
   async function rental_cost_helper(typeId){

    let res = await axios.get('http://127.0.0.1:8000/carType/' );
    let data = res.data;
    const length = Object.keys(data).length;
  
    for (let i =0; i < length; i++){
        
        if (data[i].id == typeId){
            console.log("Days, Weeks, Months: Rates", data[i].dailyCost, data[i].weeklyCost, data[i].monthlyCost)
  
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
  console.log(rate_list)

  var calc = (rate_list[0] * days) + (rate_list[1] * weeks) + (rate_list[2] * months)

  setRentalCost(calc)

  return parseInt(calc)


}



calc_rental_cost(3, '2022-01-09', '2022-01-18' )




  return <div>  
  


  <CarInfo
  
  car_id={2} 
  rental_cost={rentalCost} 

  //DATES MUST BE IN  YYYY-MM-DD FORMAT
  rental_start_date={'2022-01-09'} 
  rental_end_date={'2022-01-18'} 

  customer_id ={1} 

  />
    </div>;



};


export default RentConfirmation;
