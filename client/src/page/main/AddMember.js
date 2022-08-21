import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import ShareUser from "./ShareUser";
import { addWorkspaceUser } from "../../api/workspaceUserApi";

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

export default function AddMember(props) {
  const { open, setOpen, row, check, setCheck, type } = props;
  const [searchList, setSearchList] = useState([]);
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ShareUser
            searchList={searchList}
            setSearchList={setSearchList}
            member={row.member}
            type={type}
          />
          <Button
            onClick={() => {
              if (type === "workspace") {
                addWorkspaceUser(row.workspaceNo, searchList, check, setCheck);
              } else if (type === "document") {
              }
              setOpen(false);
            }}
          >
            추가
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              setSearchList([]);
            }}
          >
            취소
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
