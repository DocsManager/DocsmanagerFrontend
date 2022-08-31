import React, { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import ShareUser from "./ShareUser";
import { addWorkspaceUser, workspaceMember } from "../../api/workspaceUserApi";
import { documentAddUser, documentMember } from "../../api/documentApi";
import { workspaceMemberAddPublish } from "../../api/noticeApi";

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
  overflow: "auto",
};

export default function AddMember(props) {
  const {
    open,
    setOpen,
    setDocumentShareModal,
    infoModalOpen,
    row,
    number,
    check,
    setCheck,
    type,
  } = props;
  const [searchList, setSearchList] = useState([]);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    if (type === "workspace") {
      workspaceMember(number, setMemberList);
    } else if (type === "document") {
      documentMember(number, setMemberList);
    }
  }, []);
  console.log(row);
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 500, height: 600 }}>
          <ShareUser
            searchList={searchList}
            setSearchList={setSearchList}
            member={memberList}
            type={type}
          />
          <Button
            onClick={() => {
              if (type === "workspace") {
                addWorkspaceUser(row, searchList, check, setCheck);
              } else if (type === "document") {
                setDocumentShareModal(true);
                documentAddUser(searchList, row);
                infoModalOpen(false);
              }
              setOpen(false);
              workspaceMemberAddPublish(searchList);

              setSearchList([]);
              setOpen(false);
            }}
          >
            추가
          </Button>
          <Button
            onClick={() => {
              setSearchList([]);
              setOpen(false);
            }}
          >
            취소
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
