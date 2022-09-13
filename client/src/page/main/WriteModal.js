import React, { useState, useContext, useEffect } from "react";
import { writeFile } from "../../api/documentApi";
import { getUser, setUser } from "../../component/getUser/getUser";
import ConfirmModal from "./ConfirmModal";
import "./Modal.css";
import SucessModal from "./SucessModal";
import { MyContext } from "../Main";
import ShareUser from "./ShareUser";
import { notipublish } from "../../api/noticeApi";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { height } from "@mui/system";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {
  OutlinedInput,
  Stack,
  styled,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { theme } from "../../Config";
import { TextFieldsOutlined } from "@mui/icons-material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { WorkspaceButton } from "../workspace/AddWorkspace";
import FormHelperText from "@mui/material/FormHelperText";

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

export const InputBox = styled(OutlinedInput)({
  "& legend": {
    display: "none",
  },
});

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
  setFile,
  setSizeCheck,
  setLoading
) => {
  setWriteModal(false);
  setWriteSuccessConfirm(false);
  setWriteConfirm(false);
  check ? setCheckHandler(false) : setCheckHandler(true);
  setFile("");
  setSizeCheck(2);
  setLoading(false);
};

const WriteModal = (props) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [writeConfirm, setWriteConfirm] = useState(false);
  const [writeSuccessConfirm, setWriteSuccessConfirm] = useState(false);
  const [fileNull, setFileNull] = useState(false);
  const [sizeCheck, setSizeCheck] = useState(2);
  const [loading, setLoading] = useState(false);
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
    <ThemeProvider theme={theme}>
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

            <Box mt={1}>{props.children}</Box>
            {/* 09.03 모달창 수정 */}
            <Box>
              <Stack direction="row" spacing={2}>
                <Button
                  sx={{ fontSize: "1.3em" }}
                  component="label"
                  htmlFor="fileUpload"
                  startIcon={
                    <DriveFolderUploadOutlinedIcon sx={{ fontSize: "1.3em" }} />
                  }
                >
                  업로드
                </Button>

                <input
                  type="file"
                  id="fileUpload"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
                <InputBox
                  className="upload-name"
                  placeholder="파일 선택"
                  value={
                    file
                      ? file.name.length > 17
                        ? file.name.slice(0, 16) + "..."
                        : file.name
                      : ""
                  }
                  disabled
                />
              </Stack>
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
                  {
                    /**닫기 버튼 누르면 input에 담긴 file내용 비워지게 */
                  }
                }}
              >
                닫기
                <CloseOutlinedIcon />
              </WorkspaceButton>
            </Typography>
          </Box>
        </Modal>

        <ConfirmModal
          open={writeConfirm}
          setOpen={setWriteConfirm}
          act={() => {
            {
              writeFile(file, documentDTO, documentUser, setSizeCheck);
              setSearchList([]);
              openSuccessWriteModal(setWriteConfirm, setWriteSuccessConfirm);
              notipublish(searchList);
              setWriteModal(false);
              setLoading(true);
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
            close={() =>
              successWrite(
                setWriteModal,
                setWriteSuccessConfirm,
                setWriteConfirm,
                check,
                setCheckHandler,
                setFile,
                setSizeCheck,
                setLoading
              )
            }
          >
            <Typography>작성 완료</Typography>
          </SucessModal>
        ) : sizeCheck === 0 ? (
          <SucessModal
            open={writeSuccessConfirm}
            close={() =>
              successWrite(
                setWriteModal,
                setWriteSuccessConfirm,
                setWriteConfirm,
                check,
                setCheckHandler,
                setFile,
                setSizeCheck,
                setLoading
              )
            }
          >
            <Typography>용량 초과</Typography>
          </SucessModal>
        ) : (
          <></>
        )}
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
    </ThemeProvider>
  );
};

export default WriteModal;
