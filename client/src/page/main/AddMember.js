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

export default function AddMember({ open, setOpen, row, setList }) {
  const [searchList, setSearchList] = useState([]);
  return (
    <div>
      <Modal
        open={open.member}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ShareUser
            searchList={searchList}
            setSearchList={setSearchList}
            member={row.member}
            type={"workspace"}
          />
          <Button
            onClick={() => {
              addWorkspaceUser(row.workspaceNo, searchList, setList);
              setOpen({ member: false, edit: false });
            }}
          >
            추가
          </Button>
          <Button
            onClick={() => {
              setOpen({ member: false, edit: false });
            }}
          >
            취소
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
