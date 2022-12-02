import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import EmployeeSideBar from "../../components/EmployeeSideBar";
import AddDamagesModal from "../../components/modals/AddDamagesModal";
import ViewDamagesModal from "../../components/modals/ViewDamagesModal";

const Damages = () => {
  const [damages, setDamages] = useState([]);
  const [showAddDamagesModal, setShowAddDamagesModal] = useState(false);
  const [showViewDamagesModal, setShowViewDamagesModal] = useState(false);
  //const [customerIdFilter, setCustomerIdFilter] = useState("");
  const [currentDamage, setCurrentDamage] = useState({
    damageDate: "",
    description: "",
    damageCost: "",
    image: "",
    customerID: "",
    carID: "",
  });

  const getDamages = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/damages/`).then((res) => {
      console.log(res.data);
      setDamages(res.data);
    });
  };

  useEffect(() => {
    getDamages();
  }, []);

  return (
    <div className="flex w-full">
      <div>
        {" "}
        <EmployeeSideBar route={"damages"} />
      </div>
      <div className="ml-20 w-full mr-20 mt-4">
        {damages.length > 0 ? (
          <>
            <Grid
              container
              spacing={2}
              className="flex mt-1 pb-3 pt-1 mb-8 items-center rounded-3xl border bg-lightgrey text-grey content-center"
            >
              <Grid item xs={1}>
                <div>ID</div>
              </Grid>
              <Grid item xs={1}>
                <div>Date</div>
              </Grid>

              <Grid item xs={2}>
                <div>Damage Cost</div>
              </Grid>
              <Grid item xs={1}>
                <div>Customer ID</div>
              </Grid>
              <Grid item xs={1}>
                <div>Car ID</div>
              </Grid>
              <Grid item xs={3}>
                <div>Damage image</div>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setShowAddDamagesModal(true)}
                >
                  Add Damage <FaPlus className="ml-1" />
                </Button>
              </Grid>
            </Grid>
            {damages.map((damage, idx) => {
              return (
                <Grid
                  key={damage.id}
                  container
                  spacing={2}
                  className={`flex mb-8 pb-3 pt-1 items-center rounded-3xl border  ${
                    idx % 2 === 1 ? "bg-lightOpacity" : ""
                  }`}
                >
                  <Grid item xs={1}>
                    <div>{damage.id}</div>
                  </Grid>
                  <Grid item xs={1}>
                    <div>{damage.damageDate}</div>
                  </Grid>

                  <Grid item xs={2}>
                    <div>${damage.damageCost}</div>
                  </Grid>
                  <Grid item xs={1}>
                    <div>{damage.customerID}</div>
                  </Grid>
                  <Grid item xs={1}>
                    <div>{damage.carID}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div>
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}${damage.image}`}
                        width="50%"
                        alt={`damage.image`}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setCurrentDamage(damage);
                        setShowViewDamagesModal(true);
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
          <div className="flex justify-center items-center text-center">
            There are no Damage Records
          </div>
        )}
      </div>
      <AddDamagesModal
        open={showAddDamagesModal}
        onClose={() => setShowAddDamagesModal(false)}
        setDamages={setDamages}
      />
      <ViewDamagesModal
        currentDamage={currentDamage}
        open={showViewDamagesModal}
        onClose={() => setShowViewDamagesModal(false)}
      />
    </div>
  );
};
export default Damages;
