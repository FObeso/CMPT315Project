import React from "react";
import CarModal from "./CarModal";
const CarCard = ({car, carTypeIDs, carTypeDescs}) => {
    const startDate = '2022-01-09';
    const endDate = '2022-01-18';
    const picAlt = car.manufacturer + " " + car.model;
    const getType = (cartypeID) => {
        for(var i =0; i < carTypeIDs.length; i++){
            if(cartypeID === carTypeIDs[i]){
                
                return(carTypeDescs[i]);
            }
        }
        return ("Car type not found");
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
                />
            </div>
        </div>
    )

}
export default CarCard;