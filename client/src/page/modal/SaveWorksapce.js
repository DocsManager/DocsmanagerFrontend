import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Stack, ThemeProvider } from "@mui/material";
import ShareUser from "../main/ShareUser";
import { onHtmlPng } from "../../component/editor/pdfSave";
import UploadModal from "./UploadModal";
import { notipublish } from "../../api/noticeApi";
import { MyContext } from "../Main";
import { DriveFileRenameOutlineOutlined } from "@mui/icons-material";
import { ModalIcon } from "../workspace/AddWorkspace";
import { WorkspaceButton } from "../workspace/AddWorkspace";
import { AddBoxOutlined, CloseOutlined } from "@mui/icons-material";
import { theme } from "../../Config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  height: "700px",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
};

export default function SaveWorksapce({ open, setOpen }) {
  const [searchList, setSearchList] = useState([]);
  const [sizeCheck, setSizeCheck] = useState(2);
  const [writeConfirm, setWriteConfirm] = useState(false);
  const [writeSuccessConfirm, setWriteSuccessConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(MyContext);
  const successWrite = () => {
    notipublish(searchList, userInfo);
    setOpen(false);
    setWriteSuccessConfirm(false);
    setWriteConfirm(false);
    setSearchList([]);
    setSizeCheck(2);
    setLoading(false);
  };
  const openSuccessWriteModal = (writeFile) => {
    const title = document.getElementById("newDocumentTitle").value;
    const content = document.getElementById("newDocumentContent").value;
    const newDocument = { user: userInfo, content: content };
    const shareList = [];
    searchList.map((search) =>
      shareList.push({
        authority: search.authority,
        userNo: search,
      })
    );
    shareList.push({ authority: "MASTER", userNo: userInfo });
    writeFile(newDocument, shareList, setSizeCheck, title);
    setWriteConfirm(false);
    setWriteSuccessConfirm(true);
    setOpen(false);
    setLoading(true);
  };
  const [title, setTitle] = useState();
  const [clickHandler, setClickHandler] = useState(false);

  return (
    <ThemeProvider theme={theme}>
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
            문서 등록
          </Typography>
          <Typography component="h3" mt={1}>
            문서 제목
          </Typography>
          {/* 문서 이름 등록 안했을때 나오는 textinput */}
          {clickHandler === false || title ? (
            <TextField
              id="newDocumentTitle"
              InputProps={{
                startAdornment: (
                  <ModalIcon position="start">
                    <DriveFileRenameOutlineOutlined />
                  </ModalIcon>
                ),
              }}
              variant="outlined"
              label="문서 이름"
              margin="normal"
              sx={{ width: "280px" }}
            />
          ) : (
            <TextField
              id="newDocumentTitle"
              InputProps={{
                startAdornment: (
                  <ModalIcon
                    position="start"
                    sx={{ color: title ? "#3791f8" : "#d32f2f" }}
                  >
                    <DriveFileRenameOutlineOutlined />
                  </ModalIcon>
                ),
              }}
              variant="outlined"
              label="문서 이름"
              margin="normal"
              sx={{ width: "280px" }}
              error
              helperText="문서 제목은 필수 사항입니다!"
            />
          )}
          <ShareUser
            searchList={searchList}
            setSearchList={setSearchList}
            type={"document"}
          />
          <Stack direction="column" spacing={1}>
            <Box mt={2} mb={1}>
              파일 설명
            </Box>

            <TextField
              type="text"
              variant="outlined"
              id="newDocumentContent"
              inputProps={{ maxLength: 100 }}
              helperText="100자 제한"
              sx={{
                "& legend": {
                  display: "none",
                },
                WebkitBoxShadow: "0 0 0 1000px white inset",
              }}
            />
          </Stack>
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
                const title = document.getElementById("newDocumentTitle").value;
                setTitle(title);
                const content = document.getElementById("newDocumentContent")
                  .value;
                const newDocument = { user: userInfo, content: content };
                onHtmlPng(title, newDocument);
                title ? setClickHandler(false) : setClickHandler(true);
              }}
            >
              저장
              <AddBoxOutlined />
            </WorkspaceButton>
            <WorkspaceButton
              variant="contained"
              onClick={() => {
                setOpen(false);
                setSearchList([]);
              }}
            >
              취소
              <CloseOutlined />
            </WorkspaceButton>
          </Typography>
        </Box>
      </Modal>
      <UploadModal
        sizeCheck={sizeCheck}
        writeSuccessConfirm={writeSuccessConfirm}
        successWrite={successWrite}
        openSuccessWriteModal={openSuccessWriteModal}
        loading={loading}
        writeFile={onHtmlPng}
        writeConfirm={writeConfirm}
        setWriteConfirm={setWriteConfirm}
      />
    </ThemeProvider>
  );
}
