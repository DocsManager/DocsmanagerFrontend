import React from "react";
import "./Modal.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { WorkspaceButton } from "../workspace/AddWorkspace";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
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
          <Box
            id="child-modal-description"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {props.children}
          </Box>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
            mt={2}
          >
            <WorkspaceButton variant="contained" onClick={act}>
              확인
              <AddBoxOutlinedIcon />
            </WorkspaceButton>
            <WorkspaceButton variant="contained" onClick={() => setOpen(false)}>
              취소
              <CloseOutlinedIcon />
            </WorkspaceButton>
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmModal;
