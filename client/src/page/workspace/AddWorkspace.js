import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import ShareUser from "../main/ShareUser";
import { addWorkspace } from "../../api/workspaceApi";
import { getUser } from "../../component/getUser/getUser";

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

export default function AddWorkspace({ open, setOpen }) {
  const [searchList, setSearchList] = useState([]);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            워크스페이스
          </Typography>
          <TextField
            id="workspaceTitle"
            label="워크스페이스명"
            variant="outlined"
          />
          <ShareUser
            searchList={searchList}
            setSearchList={setSearchList}
            type={"workspace"}
          />
          <div>
            <Button
              onClick={() => {
                const title = document.getElementById("workspaceTitle").value;
                if (title) {
                  const workspace = {
                    title: title,
                    master: getUser(),
                    userList: searchList,
                  };
                  addWorkspace(workspace, setOpen);
                }
              }}
            >
              생성
            </Button>
            <Button onClick={handleClose}>취소</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
