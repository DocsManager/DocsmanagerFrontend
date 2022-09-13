import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@material-ui/core";
import { IconButton } from "@mui/material";
import { border, minHeight } from "@mui/system";
import ShareUser from "../main/ShareUser";
import { onHtmlPng } from "../../component/editor/pdfSave";
import { getUser } from "../../component/getUser/getUser";
import ConfirmModal from "../main/ConfirmModal";
import UploadModal from "./UploadModal";
import { notipublish } from "../../api/noticeApi";

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

export default function SaveWorksapce({ open, setOpen }) {
  const [searchList, setSearchList] = useState([]);
  const [sizeCheck, setSizeCheck] = useState(2);
  const [writeConfirm, setWriteConfirm] = useState(false);
  const [writeSuccessConfirm, setWriteSuccessConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const successWrite = () => {
    notipublish(searchList);
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
    const newDocument = { user: user, content: content };
    const shareList = [];
    searchList.map((search) =>
      shareList.push({
        authority: search.authority,
        userNo: search,
      })
    );
    shareList.push({ authority: "MASTER", userNo: user });
    writeFile(newDocument, shareList, setSizeCheck, title);
    setWriteConfirm(false);
    setWriteSuccessConfirm(true);
    setOpen(false);
    setLoading(true);
  };

  const user = getUser();
  const [title, setTitle] = useState();
  const [clickHandler, setClickHandler] = useState(false);

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
            문서 등록
          </Typography>
          <hr />
          {/* 문서 이름 등록 안했을때 나오는 textinput */}
          {clickHandler === false || title ? (
            <TextField
              id="newDocumentTitle"
              label="문서 이름"
              variant="outlined"
            />
          ) : (
            <TextField
              id="newDocumentTitle"
              label="문서 이름"
              variant="outlined"
              error
              helperText="문서 제목은 필수 사항입니다!"
            />
          )}
          <ShareUser
            searchList={searchList}
            setSearchList={setSearchList}
            type={"document"}
          />
          <TextField
            id="newDocumentContent"
            label="파일 설명"
            variant="outlined"
          />
          <div>
            <Button
              onClick={() => {
                const title = document.getElementById("newDocumentTitle").value;
                setTitle(title);
                const content = document.getElementById("newDocumentContent")
                  .value;
                const newDocument = { user: user, content: content };
                onHtmlPng(title, newDocument);
                title ? setClickHandler(false) : setClickHandler(true);
              }}
            >
              저장
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                setSearchList([]);
              }}
            >
              취소
            </Button>
          </div>
        </Box>
        {/* <ConfirmModal open={}><Typography>등록 하시겠습니까?</Typography></ConfirmModal> */}
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
    </div>
  );
}
