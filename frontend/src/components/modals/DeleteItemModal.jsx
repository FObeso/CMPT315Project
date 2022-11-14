import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "400px",
  height: "20%",
  bgcolor: "background.paper",
  border: "2px solid #006639",
  boxShadow: 24,
  borderRadius: "20px",
  overflow: "auto",
  p: 4,
};

function DeleteItemModal({ open, onClose, item, handleOption }) {
  return (
    <React.Fragment>
      <Modal
        hideBackdrop
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Confirm Deletion</h2>
          <p id="child-modal-description">
            Are you sure you would like to delete this {item}?
          </p>
          <div className="flex flex-row justify-around mt-5">
            <Button
              color="error"
              variant="contained"
              onClick={() => handleOption(false)}
            >
              No
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={() => handleOption(true)}
            >
              Yes
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default DeleteItemModal;
