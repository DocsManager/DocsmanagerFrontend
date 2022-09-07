import React, { useState, useContext } from "react";
import "./Modal.css";
import { updateContent } from "../../api/documentApi";
import SucessModal from "./SucessModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { MyContext } from "../Main";

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
  const { check, setCheckHandler } = useContext(MyContext);

  const { open, setOpen, document, infoModalOpen } = props;

  return (
    <React.Fragment>
      <Modal
        // hideBackdrop
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <div id="child-modal-description">
            <main>
              <div>내용 수정</div>
              <input
                type="text"
                defaultValue={document.content}
                onChange={(e) => setContent(e.target.value)}
              />
            </main>
          </div>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            취소
          </Button>
          <Button
            onClick={() => {
              infoModalOpen(false);
              setContentUpdateModal(true);
              updateContent(document.documentNo, content);
              check ? setCheckHandler(false) : setCheckHandler(true);
              setOpen(false);
            }}
          >
            확인
          </Button>
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
