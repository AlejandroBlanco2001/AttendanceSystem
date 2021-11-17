import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const MyModal = ({ loading, title, open, handleClose, text }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    fontFamily: "Quicksand",
    height: "fit-content",
    bgcolor: "background.paper",
    border: "none",
    borderRadius: 3,
    outline: "none",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    pt: 4,
    px: 4,
    pb: 4,
    mt: 2,
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ mt: 2 }}
            align="center"
          >
            {title}
          </Typography>
          <Typography
            id="modal-modal-text"
            component="p"
            sx={{ mt: 2 }}
            paragraph={true}
            align="center"
          >
            {text}
          </Typography>
          {loading == true ? <CircularProgress /> : <></>}
        </Box>
      </Modal>
    </>
  );
};

export default MyModal;
