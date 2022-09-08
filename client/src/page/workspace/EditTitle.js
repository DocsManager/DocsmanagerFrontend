import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { updateTitleWorkspace } from "../../api/workspaceApi";

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

function EditTitle({ open, setOpen, row, setList }) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="newTitle" component={"h1"} align="center">
            새로운 워크스페이스 이름을 입력하세요
          </Typography>
          <br />
          <div style={{ textAlign: "center" }}>
            <TextField
              id="newWorksapceTitle"
              label="워크스페이스명"
              variant="outlined"
            />
          </div>

          <Button
            onClick={() => {
              const newTitle = document.getElementById("newWorksapceTitle")
                .value;

              if (newTitle) {
                updateTitleWorkspace(
                  row.workspaceNo,
                  { title: newTitle },
                  setList
                );
                setOpen(false);
              } else {
                alert("값을 입력하세요");
              }
            }}
          >
            수정
          </Button>
          <Button onClick={() => setOpen(false)}>취소</Button>
        </Box>
      </Modal>
    </div>
  );
}
export default EditTitle;
