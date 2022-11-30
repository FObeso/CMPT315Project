import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Modal, Grid } from "@mui/material";
import Typography from '@mui/material/Typography';


const ViewDamagesModal = ({
    currentDamage,
    open,
    onClose,
}) => {


    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800,
        height: "80%",
        bgcolor: "background.paper",
        border: "2px solid #006639",
        boxShadow: 24,
        borderRadius: "20px",
        overflow: "auto",
        p: 4,
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2" className="text-center">
                    Damage Information
                </Typography>
                <hr />
                <div></div>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"

                >
                    <Grid item xs={12} >
                        <div>
                            <img src={`${process.env.REACT_APP_SERVER_URL}${currentDamage.image}`}
                                width="100%"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
                            Damage Details:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {currentDamage.description}
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};


export default ViewDamagesModal;