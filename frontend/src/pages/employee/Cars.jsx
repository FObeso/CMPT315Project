import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import EmployeeSideBar from "../../components/EmployeeSideBar";
import AddCarModal from "../../components/modals/AddCarModal";
import ViewAndEditCarModal from "../../components/modals/ViewAndEditCarModal";
import useBranches from "../../hooks/useBranches";
import useCarTypes from "../../hooks/useCarTypes";
const Cars = () => {
  const [cars, setCars] = useState([]);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [branches, setBranches] = useBranches();
  const [carTypes, setCarTypes] = useCarTypes();
  const [manuefacturers, setManufacturers] = useState([]);
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

  const [manufacturerFilter, setManufacturerFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [carTypeFilter, setCarTypeFilter] = useState("");

  const getCars = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/cars/`).then((res) => {
      console.log(res.data);
      const allManues = res.data?.map((car) => car.manufacturer);
      const filteredMans = [];
      for (let man of allManues) {
        if (!filteredMans.includes(man)) {
          filteredMans.push(man);
        }
      }
      setManufacturers(filteredMans);
      setCars(res.data);
    });
  };

  useEffect(() => {
    getCars();
  }, []);

  const resetFilters = () => {};

  return (
    <div className="flex w-full">
      <div>
        {" "}
        <EmployeeSideBar route={"cars"} />
      </div>
      <div className="ml-20 w-full mr-20 mt-4">
        {cars.length > 0 ? (
          <>
            <div className="flex mt-1 pb-3 pt-1 mb-8 items-center rounded-md border-2 border-primaryText h-28  bg-lightgrey">
              <div className="flex flex-row items-center">
                <h3 className="font-semibold ml-3">Filter By: </h3>
                <div className="flex flex-column items-center mx-2 justify-center">
                  <select
                    name="manufacturer"
                    id="Manufacturer"
                    className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
                    onChange={(e) => setManufacturerFilter(e.target.value)}
                  >
                    <option value="">All Manufacturers</option>
                    {manuefacturers.map((manufacturer) => (
                      <option value={manufacturer} key={manufacturer}>
                        {manufacturer}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  name="BranchID"
                  className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
                  onChange={(e) => setBranchFilter(e.target.value)}
                >
                  <option value="">All Branches</option>
                  {branches.map((branch) => (
                    <option value={branch.id} key={branch.id}>
                      {branch.branchName}
                    </option>
                  ))}
                </select>
                <select
                  name="CarType"
                  className="w-52 m-2 mt-5 p-2 border rounded-md border-primary "
                  onChange={(e) => setCarTypeFilter(e.target.value)}
                >
                  <option value="">All Car Types</option>
                  {carTypes.map((type) => (
                    <option value={type.id} key={type.id}>
                      {type.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
            {cars
              .filter((car) => {
                if (manufacturerFilter.length === 0) return true;
                return car.manufacturer === manufacturerFilter;
              })
              .filter((car) => {
                if (branchFilter.length === 0) return true;
                return car.BranchID === Number(branchFilter);
              })
              .filter((car) => {
                if (carTypeFilter.length === 0) return true;
                return car.typeID === Number(carTypeFilter);
              })
              .map((car, idx) => {
                return (
                  <Grid
                    key={car.id}
                    container
                    spacing={2}
                    style={{ border: "1px solid green" }}
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
