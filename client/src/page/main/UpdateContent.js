import React, { useState, useContext } from "react";
import "./Modal.css";
import { updateContent } from "../../api/documentApi";
import SucessModal from "./SucessModal";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MyContext } from "../Main";
import { TextField, Typography } from "@mui/material";
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
  // border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const UpdateContent = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const [content, setContent] = useState("");
  const [contentUpdateModal, setContentUpdateModal] = useState(false);
  const { check, setCheckHandler, userInfo } = useContext(MyContext);

  const { open, setOpen, document, infoModalOpen, member } = props;
  return (
    <React.Fragment>
      <Modal
        // hideBackdrop
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        {/* 내용 수정 모달 css 변경 */}
        <Box sx={{ ...style, width: 400 }}>
          <div id="child-modal-description">
            <main>
              <Typography component="h3" mt={1} mb={2} align="center">
                내용 수정
              </Typography>
              <TextField
                mt={1}
                sx={{
                  width: "340px",
                  "& legend": {
                    display: "none",
                  },
                }}
                inputProps={{ maxLength: 100 }}
                helperText="100자 제한"
                type="text"
                defaultValue={document.content}
                onChange={(e) => setContent(e.target.value)}
                variant="outlined"
              />
            </main>
          </div>
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
                const noticeContent = `${userInfo.name}님께서 ${
                  document.originalName
                } 문서 내용을 수정하셨습니다.`;
                infoModalOpen(false);
                setContentUpdateModal(true);
                console.log(member);
                updateContent(
                  document,
                  content,
                  member,
                  userInfo,
                  noticeContent
                );
                check ? setCheckHandler(false) : setCheckHandler(true);
                setOpen(false);
              }}
            >
              확인
              <AddBoxOutlinedIcon />
            </WorkspaceButton>
            <WorkspaceButton
              variant="contained"
              onClick={() => {
                setOpen(false);
              }}
            >
              취소
              <CloseOutlinedIcon />
            </WorkspaceButton>
          </Typography>
        </Box>
      </Modal>
      <SucessModal
        open={contentUpdateModal}
        close={() => {
          setContentUpdateModal(false);
          infoModalOpen(false);
          check ? setCheckHandler(false) : setCheckHandler(true);
        }}
      >
        <main>
          <div>수정 완료</div>
        </main>
      </SucessModal>
    </React.Fragment>
  );
};

export default UpdateContent;
