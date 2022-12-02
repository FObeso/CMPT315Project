import React, { Component } from "react";
import CarInfo from "../../components/CarInfo"

const RentConfirmation = () => {

  /*Must pass in the following props in order for the page to display
  car all information and for the post request to the db to be successful 
  
   car_id
   customer_id
   rental_cost
   rental_start_date
   rental_end_date  */
   

  return <div>  
  
  <CarInfo
  
  car_id={2} 
  rental_cost={102} 
  //DATES MUST BE IN  YYYY-MM-DD FORMAT
  rental_start_date={'2022-01-09'} 
  rental_end_date={'2022-01-18'} 
  customer_id ={1} 
  
  />
    </div>;



};


export default RentConfirmation;
