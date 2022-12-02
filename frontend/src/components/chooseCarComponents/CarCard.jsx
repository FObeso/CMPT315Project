import React from "react";
const CarCard = ({car, finishSelection, carTypeIDs, carTypeDescs}) => {
    const picAlt = car.manufacturer + " " + car.model;
    const getType = (cartypeID) => {
        for(var i =0; i < carTypeIDs.length; i++){
            if(cartypeID === carTypeIDs[i]){
                
                return(carTypeDescs[i]);
            }
        }
        return ("Car type not found");
    }
    return(
        <div className='car'
            onClick={finishSelection}
        >
            <div>
                <h3>{car.id}</h3>
            </div>
            {<div>
                {/* <img src = {car.Poster !== 'N/A' ? 
                car.Poster : 'https://via.placeholder.com/400'} 
                alt = {picAlt}/> */}
                {/* <img src = {movie.image !== 'N/A' ? 
                movie.image : 'https://via.placeholder.com/400'}  */}
                <img src = 'https://via.placeholder.com/400' 
                alt = {picAlt}/>
            </div>}
            <div>
                
            <p>{car.manufacturer}</p>
                
                <p>{car.model}</p>
                
                <p>{car.colour}</p>
                
                {/* <p>{car.typeID}</p> */}
                <p>{getType(car.typeID)}</p>

                <p>{car.status}</p>
            </div>
        </div>
    )

}
export default CarCard;