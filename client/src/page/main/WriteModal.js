import React, { useState, useContext } from "react";
import { writeFile } from "../../api/documentApi";
import "./Modal.css";
import SucessModal from "./SucessModal";
import { MyContext } from "../Main";
import ShareUser from "./ShareUser";
import { notipublish } from "../../api/noticeApi";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { OutlinedInput, Stack, styled, TextField } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ModalIcon, WorkspaceButton } from "../workspace/AddWorkspace";
import UploadModal from "../modal/UploadModal";
import { makeStyles } from "@material-ui/core/styles";

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
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
};

const useStyles = makeStyles((theme) => ({
  helperText: {
    justifyContent: "right",
  },
}));

export const InputBox = styled(OutlinedInput)({
  "& legend": {
    display: "none",
  },
});

const openNoFileConfirm = (fileNull, setFileNull) => {
  fileNull ? setFileNull(false) : setFileNull(true);
};

const WriteModal = (props) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [writeConfirm, setWriteConfirm] = useState(false);
  const [writeSuccessConfirm, setWriteSuccessConfirm] = useState(false);
  const [fileNull, setFileNull] = useState(false);
  const [sizeCheck, setSizeCheck] = useState(3);
  const [loading, setLoading] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const { open, setWriteModal, setPage } = props;
  const { check, setCheckHandler, userInfo } = useContext(MyContext);
  const classes = useStyles();
  const documentDTO = {
    user: userInfo,
    content: text,
  };
  const documentUser = searchList.map(
    (search) => (search = { authority: search.authority, userNo: search })
  );
  const successWrite = () => {
    const content = `${userInfo.name}님이 문서를 공유했습니다.`;
    notipublish(searchList, userInfo, content);
    setWriteModal(false);
    setWriteSuccessConfirm(false);
    setWriteConfirm(false);
    setCheckHandler(!check);
    setFile("");
    setSearchList([]);
    setSizeCheck(3);
    setLoading(false);
    setPage(0);
  };
  const openSuccessWriteModal = (writeFile) => {
    writeFile(file, documentDTO, documentUser, setSizeCheck);
    setWriteConfirm(false);
    setWriteSuccessConfirm(true);
    setWriteModal(false);
    setLoading(true);
  };

  documentUser.push({ userNo: userInfo, authority: "MASTER" });

  return (
    // <ThemeProvider theme={theme}>
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => setWriteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 500, height: 700 }}>
          <Typography
            variant="h6" //텍스트의 크기 뿐만 아니라 HTML 태그 결정, <h6/>로 마크업 됨
            component="h2" //variant prop과 상이한 HTML 태그를 사용해야 할 때는 component prop으로 태그명을 명시
            align="center"
            mb={2}
            mt={2}
            id="modal-modal-title"
          >
            새로운 문서 등록
          </Typography>

          <Box mt={1} mb={2}>
            {props.children}
          </Box>
          {/* 09.03 모달창 수정 */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="file"
              id="fileUpload"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />

            <TextField
              mt={1}
              className="upload-name"
              InputProps={{
                startAdornment: (
                  <ModalIcon position="start">
                    <AttachFileOutlinedIcon />
                  </ModalIcon>
                ),
              }}
              value={
                file
                  ? file.name.length > 17
                    ? file.name.slice(0, 16) + "..."
                    : file.name
                  : ""
              }
              label="파일명"
            />
            <Button
              sx={{ fontSize: "1.1em", marginLeft: "10px" }}
              component="label"
              htmlFor="fileUpload"
              endIcon={
                <DriveFolderUploadOutlinedIcon sx={{ fontSize: "1.1em" }} />
              }
            >
              업로드
            </Button>
          </Box>

          <ShareUser
            searchList={searchList}
            setSearchList={setSearchList}
            type="document"
          />
          {/**파일 설명 input란 css 수정 */}
          <Stack direction="column" spacing={1}>
            <Box mt={2} mb={1}>
              파일 설명
            </Box>

            <TextField
              type="text"
              variant="outlined"
              id="fileContent"
              inputProps={{ maxLength: 100 }}
              helperText="100자 제한"
              sx={{
                "& legend": {
                  display: "none",
                },
              }}
              FormHelperTextProps={{
                className: classes.helperText,
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
                const contentElem = document.getElementById("fileContent")
                  .value;
                setText(contentElem);
                file
                  ? setWriteConfirm(true)
                  : openNoFileConfirm(fileNull, setFileNull);
              }}
            >
              저장
              <AddBoxOutlinedIcon />
            </WorkspaceButton>
            <WorkspaceButton
              variant="contained"
              onClick={() => {
                setSearchList([]);
                setWriteModal(false);
                setFile();
                // 닫기 버튼 누르면 input에 담긴 file내용 비워지게
              }}
            >
              닫기
              <CloseOutlinedIcon />
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
        writeFile={writeFile}
        writeConfirm={writeConfirm}
        setWriteConfirm={setWriteConfirm}
      />
      {/* <ConfirmModal
          open={writeConfirm}
          setOpen={setWriteConfirm}
          act={() => {
            {
              writeFile(file, documentDTO, documentUser, setSizeCheck);
              openSuccessWriteModal();
              // openSuccessWriteModal(setWriteConfirm, setWriteSuccessConfirm);
              // setWriteModal(false);
              // setLoading(true);
              // check ? setCheckHandler(false) : setCheckHandler(true);
            }
          }}
        >
          <Typography>등록 하시겠습니까?</Typography>
        </ConfirmModal>
        <SucessModal open={loading}>
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
            <Typography>업로드 중입니다...</Typography>
          </Box>
        </SucessModal>
        {sizeCheck === 1 ? (
          <SucessModal
            open={writeSuccessConfirm}
            close={
              // successWrite(
              //   setWriteModal,
              //   setWriteSuccessConfirm,
              //   setWriteConfirm,
              //   check,
              //   setCheckHandler,
              //   setFile,
              //   setSizeCheck,
              //   setLoading
              // )
              successWrite
            }
          >
            <Typography>작성 완료</Typography>
          </SucessModal>
        ) : sizeCheck === 0 ? (
          <SucessModal
            open={writeSuccessConfirm}
            close={
              // successWrite(
              //   setWriteModal,
              //   setWriteSuccessConfirm,
              //   setWriteConfirm,
              //   check,
              //   setCheckHandler,
              //   setFile,
              //   setSizeCheck,
              //   setLoading
              // )
              successWrite
            }
          >
            <Typography>용량 초과</Typography>
          </SucessModal>
        ) : (
          <></>
        )} */}
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
    // </ThemeProvider>
  );
};

export default WriteModal;
