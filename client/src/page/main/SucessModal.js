import React from "react";
import "./Modal.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SucessModal = (props) => {
  const { open, close } = props;

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Box id="modal-modal-description">{props.children}</Box>
          {close ? <Button onClick={close}>확인</Button> : <></>}
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default SucessModal;
