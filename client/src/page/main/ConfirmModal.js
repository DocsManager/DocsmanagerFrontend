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
  pt: 2,
  px: 4,
  pb: 3,
};

const ConfirmModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴

  const { open, setOpen, act } = props;

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 350 }}>
          <Typography id="child-modal-description">{props.children}</Typography>
          <Button onClick={() => setOpen(false)}>취소</Button>
          <Button onClick={act}>확인</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmModal;
