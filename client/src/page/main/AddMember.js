import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import ShareUser from "./ShareUser";
import { addWorkspaceUser, workspaceMember } from "../../api/workspaceUserApi";
import { documentAddUser, documentMember } from "../../api/documentApi";
import { workspaceMemberAddPublish } from "../../api/noticeApi";
import { WorkspaceButton } from "../workspace/AddWorkspace";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
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
  overflow: "auto",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
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
  const { userInfo } = useContext(MyContext);

  useEffect(() => {
    if (type === "workspace") {
      workspaceMember(number, setMemberList);
    } else if (type === "document") {
      documentMember(number, setMemberList);
    }
  }, []);
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
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
            mt={2}
          >
            <WorkspaceButton
              variant="contained"
              onClick={() => {
                if (type === "workspace") {
                  addWorkspaceUser(row, searchList, check, setCheck);
                } else if (type === "document") {
                  setDocumentShareModal(true);
                  documentAddUser(searchList, row);
                  infoModalOpen(false);
                }
                setOpen(false);
                workspaceMemberAddPublish(
                  memberList,
                  searchList,
                  type,
                  row,
                  userInfo
                );
                {
                  /**type에 따른 메시지 내용 구분 */
                }

                setSearchList([]);
                setOpen(false);
              }}
            >
              추가
              <AddBoxOutlinedIcon />
            </WorkspaceButton>
            <WorkspaceButton
              variant="contained"
              onClick={() => {
                setSearchList([]);
                setOpen(false);
              }}
            >
              취소
              <CloseOutlinedIcon />
            </WorkspaceButton>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
