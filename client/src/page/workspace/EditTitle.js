import React, { useContext } from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { updateTitleWorkspace } from "../../api/workspaceApi";
import { WorkspaceButton } from "./AddWorkspace";
import { CloseOutlined, Edit } from "@mui/icons-material";
import { MyContext } from "../Main";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function EditTitle({ open, setOpen, row, setList }) {
  const { check, setCheckHandler, userInfo } = useContext(MyContext);
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
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <WorkspaceButton
              variant="contained"
              endIcon={<Edit />}
              // sx={{marginRight:"10px"}}
              onClick={() => {
                const newTitle = document.getElementById("newWorksapceTitle")
                  .value;

                if (newTitle) {
                  updateTitleWorkspace(
                    row.workspaceNo,
                    row.title,
                    { title: newTitle },
                    check,
                    setCheckHandler,
                    userInfo
                  );
                  setOpen(false);
                } else {
                  alert("값을 입력하세요");
                }
              }}
            >
              수정
            </WorkspaceButton>
            <WorkspaceButton
              variant="contained"
              onClick={() => setOpen(false)}
              endIcon={<CloseOutlined />}
            >
              취소
            </WorkspaceButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
export default EditTitle;
