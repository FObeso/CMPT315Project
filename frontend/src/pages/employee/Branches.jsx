import React from "react";
import EmployeeSideBar from "../../components/EmployeeSideBar";
import { Button, Grid } from "@mui/material";
import AddBranchModal from "../../components/modals/AddBranchModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [showAddBranchModal, setShowAddBranchModal] = useState(false);

  const getBranches = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/branch/`).then((res) => {
      console.log(res.data);
      setBranches(res.data);
    });
  };

  useEffect(() => {
    getBranches();
  }, []);

  return (
    <div>
      <div className="flex flex-row w-full">
        <EmployeeSideBar route={"branches"} />
        <div className="ml-20 w-full mr-20 mt-4">
          {branches.length > 0 ? (
            <>
              <Grid
                container
                spacing={2}
                className="flex mt-1 pb-3 pt-1 mb-8 items-center rounded-3xl border bg-lightgrey text-grey content-center"
              >
                <Grid item xs={2}>
                  <div>Name</div>
                </Grid>
                <Grid item xs={1.5}>
                  <div>Phone Number</div>
                </Grid>

                <Grid item xs={2.5}>
                  <div>Address</div>
                </Grid>
                <Grid item xs={1.5}>
                  <div>Postal Code</div>
                </Grid>
                <Grid item xs={2.5}>
                  <div>City, Province</div>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setShowAddBranchModal(true)}
                  >
                    Add Branch <FaPlus className="ml-1" />
                  </Button>
                </Grid>
              </Grid>
              {branches.map((branch, idx) => {
                return (
                  <Grid
                    key={branch.id}
                    container
                    spacing={2}
                    className={`flex mb-8 pb-3 pt-1 items-center rounded-3xl border  ${idx % 2 === 1 ? "bg-lightOpacity" : ""
                      }`}
                  >
                    <Grid item xs={2}>
                      <div>{branch.branchName}</div>
                    </Grid>
                    <Grid item xs={1.5}>
                      <div>{branch.phoneNumber}</div>
                    </Grid>

                    <Grid item xs={2.5}>
                      <div>{branch.streetNumber} {branch.streetName}</div>
                    </Grid>
                    <Grid item xs={1.5}>
                      <div>{branch.postalCode}</div>
                    </Grid>
                    <Grid item xs={2.5}>
                      <div>{branch.city}, {branch.province}</div>
                    </Grid>
                    <Grid item xs={2}>
                      <Button variant="contained" color="success">
                        View Info
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}
            </>
          ) : (
            <p>No branch</p>
          )}
        </div>
        <AddBranchModal
        open={showAddBranchModal}
        onClose={() => setShowAddBranchModal(false)}
        setBranches={setBranches}
      />
      </div>
    </div>
  );
};

export default Branches;
