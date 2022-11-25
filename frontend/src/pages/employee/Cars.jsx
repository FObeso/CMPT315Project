import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import EmployeeSideBar from "../../components/EmployeeSideBar";
import AddCarModal from "../../components/modals/AddCarModal";
import ViewAndEditCarModal from "../../components/modals/ViewAndEditCarModal";
const Cars = () => {
  const [cars, setCars] = useState([]);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [showViewInfoModal, setShowViewInfoModal] = useState(false);
  const [currentCar, setCurrentCar] = useState({
    manufacturer: "",
    model: "",
    fuelType: "",
    colour: "",
    licensePlate: "",
    status: "",
    mileage: "",
    typeID: "",
    BranchID: "",
  });
  const getCars = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/cars/`).then((res) => {
      console.log(res.data);
      setCars(res.data);
    });
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="flex w-full">
      <div>
        {" "}
        <EmployeeSideBar route={"cars"} />
      </div>
      <div className="ml-20 w-full mr-20 mt-4">
        {cars.length > 0 ? (
          <>
            <Grid
              container
              spacing={2}
              className="flex mt-1 pb-3 pt-1 mb-8 items-center rounded-3xl border bg-lightgrey text-grey content-center"
            >
              <Grid item xs={2.5}>
                <div>Manufacturer</div>
              </Grid>
              <Grid item xs={2.5}>
                <div>Model</div>
              </Grid>

              <Grid item xs={3}>
                <div>Colour</div>
              </Grid>
              <Grid item xs={2}>
                <div>Status</div>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setShowAddCarModal(true)}
                >
                  Add Car <FaPlus className="ml-1" />
                </Button>
              </Grid>
            </Grid>
            {cars.map((car, idx) => {
              return (
                <Grid
                  key={car.id}
                  container
                  spacing={2}
                  className={`flex mb-8 pb-3 pt-1 items-center rounded-3xl border  ${
                    idx % 2 === 1 ? "bg-lightOpacity" : ""
                  }`}
                >
                  <Grid item xs={2.5}>
                    <div>{car.manufacturer}</div>
                  </Grid>
                  <Grid item xs={2.5}>
                    <div>{car.model}</div>
                  </Grid>

                  <Grid item xs={3}>
                    <div>{car.colour}</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>{car.status}</div>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setCurrentCar(car);
                        setShowViewInfoModal(true);
                      }}
                    >
                      View Info
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
          </>
        ) : (
          <p>hello</p>
        )}
      </div>
      <AddCarModal
        open={showAddCarModal}
        onClose={() => setShowAddCarModal(false)}
        setCars={setCars}
      />

      <ViewAndEditCarModal
        currentCar={currentCar}
        setCurrentCar={setCurrentCar}
        open={showViewInfoModal}
        onClose={() => setShowViewInfoModal(false)}
        setCars={setCars}
      />
    </div>
  );
};

export default Cars;
