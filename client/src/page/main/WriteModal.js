import React, { useState, useContext, useEffect } from "react";
import { writeFile } from "../../api/documentApi";
import { getUser, setUser } from "../../component/getUser/getUser";
import ConfirmModal from "./ConfirmModal";
import "./Modal.css";
import SucessModal from "./SucessModal";
import { MyContext } from "./DmTable";
import ShareUser from "./ShareUser";
import { notipublish } from "../../api/noticeApi";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { height } from "@mui/system";

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
  overflow: "auto",
};

const openNoFileConfirm = (fileNull, setFileNull) => {
  fileNull ? setFileNull(false) : setFileNull(true);
};

const openSuccessWriteModal = (setWriteConfirm, setWriteSuccessConfirm) => {
  setWriteConfirm(false);
  setWriteSuccessConfirm(true);
};

const successWrite = (
  setWriteModal,
  setWriteSuccessConfirm,
  setWriteConfirm,
  check,
  setCheckHandler,
  setFile
) => {
  setWriteModal(false);
  setWriteSuccessConfirm(false);
  setWriteConfirm(false);
  check ? setCheckHandler(false) : setCheckHandler(true);
  setFile("");
};

const WriteModal = (props) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [writeConfirm, setWriteConfirm] = useState(false);
  const [writeSuccessConfirm, setWriteSuccessConfirm] = useState(false);
  const [fileNull, setFileNull] = useState(false);

  const [searchList, setSearchList] = useState([]);
  const { open, setWriteModal } = props;

  const user = getUser();
  const documentDTO = {
    user: user,
    content: text,
  };
  const documentUser = searchList.map(
    (search) => (search = { authority: search.authority, userNo: search })
  );

  documentUser.push({ userNo: user, authority: "MASTER" });

  const { check, setCheckHandler } = useContext(MyContext);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => setWriteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 800, height: 700 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            문서 등록
          </Typography>

          <div>{props.children}</div>
          <input
            type="file"
            id="fileUpload"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <ShareUser
            searchList={searchList}
            setSearchList={setSearchList}
            type="document"
          />
          <div>파일 설명</div>
          <input
            type="text"
            id="fileContent"
            onChange={(e) => setText(e.target.value)}
          />
          <Typography>
            <Button
              onClick={() => {
                setSearchList([]);
                setWriteModal(false);
              }}
            >
              닫기
            </Button>
            <Button
              onClick={() => {
                file
                  ? setWriteConfirm(true)
                  : openNoFileConfirm(fileNull, setFileNull);
              }}
            >
              저장
            </Button>
          </Typography>
        </Box>
      </Modal>

      <ConfirmModal
        open={writeConfirm}
        setOpen={setWriteConfirm}
        act={() => {
          {
            writeFile(file, documentDTO, documentUser);
            setSearchList([]);
            openSuccessWriteModal(setWriteConfirm, setWriteSuccessConfirm);
            notipublish(searchList);
            setWriteModal(false);
            // check ? setCheckHandler(false) : setCheckHandler(true);
          }
        }}
      >
        <main>
          <div>등록 하시겠습니까?</div>
        </main>
      </ConfirmModal>

      <SucessModal
        open={writeSuccessConfirm}
        close={() =>
          successWrite(
            setWriteModal,
            setWriteSuccessConfirm,
            setWriteConfirm,
            check,
            setCheckHandler,
            setFile
          )
        }
      >
        <main>
          <div>작성 완료</div>
        </main>
      </SucessModal>
      {
        <SucessModal
          open={fileNull}
          close={() => openNoFileConfirm(fileNull, setFileNull)}
        >
          <main>
            <div>파일이 없습니다.</div>
          </main>
        </SucessModal>
      }
    </React.Fragment>
  );
};

export default WriteModal;
