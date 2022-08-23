import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@material-ui/core";
import { IconButton } from "@mui/material";
import { minHeight } from "@mui/system";
import ShareUser from "../main/ShareUser";
import { onHtmlPng } from "../../component/editor/pdfSave";
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

export default function SaveWorksapce({ open, setOpen }) {
  const [searchList, setSearchList] = useState([]);
  const user = getUser();

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
          <TextField
            id="newDocumentTitle"
            label="문서 이름"
            variant="outlined"
          />
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
                const content = document.getElementById("newDocumentContent")
                  .value;
                const newDocument = { user: user, content: content };
                onHtmlPng(title, newDocument);
              }}
            >
              저장
            </Button>
            <Button onClick={() => setOpen(false)}>취소</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
