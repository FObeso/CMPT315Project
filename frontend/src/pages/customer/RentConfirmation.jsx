import React from "react";
import CarInfo from "../../components/CarInfo"
import {useLocation} from 'react-router-dom';

const RentConfirmation = () => {

	const location = useLocation();
  
	// const car = localStorage.getItem("car");
	const car = location.state.carState;
  
	const startDate = location.state.startDate;
  
	const endDate = location.state.endDate;
  const carID = car.id;
  const customerID = localStorage.getItem("customerID");
	console.log(customerID);
	console.log(car);
  /*Must pass in the following props in order for the page to display
  car all information and for the post request to the db to be successful 
  
   car_id
   customer_id
   rental_cost
   rental_start_date
   rental_end_date  */
  
  //  axios
  //     .get(`${process.env.REACT_APP_SERVER_URL}/customer/getID/`, {
  //       params: {
  //         email: email,
  //       },
  //     })
  //     .then((res) => {
  //       alert.setItem(res.data.customer.email);
  //       toast.success("Login Successful");
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //       toast.error(err.message);
  //     });

  return <div>
  {/* <div>{JSON.stringify(startDate)}</div>
  HERE
<div>{JSON.stringify(endDate)}</div> */}
  
  <CarInfo
  
  car_id={carID} 
  rental_cost={102} 
  //DATES MUST BE IN  YYYY-MM-DD FORMAT
  rental_start_date={startDate} 
  rental_end_date={endDate} 
  customer_id ={customerID} 
  car_image = {car.image}
  />
    </div>;



};


export default RentConfirmation;
