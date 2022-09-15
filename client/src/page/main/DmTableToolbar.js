import React, { useState, useContext } from "react";
import Toolbar from "@mui/material/Toolbar";
import {
  Delete,
  FolderSpecial,
  Outbox,
  SearchOutlined,
  Warning,
} from "@mui/icons-material";
import { Button, Typography, styled, TextField, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  deleteFile,
  restoreFile,
  updateRecycleBinFile,
  writeFile,
  masterDeleteFile,
  searchDocument,
} from "../../api/documentApi";
import ConfirmModal from "./ConfirmModal";
import SucessModal from "./SucessModal";
import { MyContext } from "../Main";
import WriteModal from "./WriteModal";
import { getUser } from "../../component/getUser/getUser";

//문서 등록, 중요 문서 안내 버튼 styled 컴포넌트로
const EnrollBtn = styled(Button)({
  backgroundColor: "#3791f8",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1em",
});
export const InfoFunctionBox = styled(Box)({
  border: "1px solid #3791f8",
  color: "#3781f8",
  padding: "10px",
  borderRadius: "5px",
});
const ToRecyclebin = styled(Button)({
  backgroundColor: "#FF6262",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1em",
  "&:hover": {
    backgroundColor: "#EF5757",
  },
});
export { EnrollBtn, ToRecyclebin };

const handleToolbarBtn = (writeModalOpen, setWriteModalOpen) => {
  switch (window.location.href.split("/main")[1]) {
    case "/important":
      return (
        <InfoFunctionBox variant="contained">
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "250px",
            }}
          >
            중요한 문서를 관리해보세요!
            <FolderSpecial />
          </Typography>
        </InfoFunctionBox>
      );

    case "/trashcan":
      return (
        <InfoFunctionBox variant="contained">
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "350px",
            }}
          >
            휴지통에서 삭제되면 복원할 수 없습니다!
            <Warning />
          </Typography>
        </InfoFunctionBox>
      );
    default:
      return (
        <div>
          <EnrollBtn
            variant="contained"
            endIcon={<Outbox />}
            onClick={() => {
              writeModalOpen
                ? setWriteModalOpen(false)
                : setWriteModalOpen(true);
            }}
          >
            문서 등록
          </EnrollBtn>
        </div>
      );
  }
};

const closeSuccessModal = (modalOpen, check, setCheckHandler, setSelected) => {
  modalOpen(false);
  check ? setCheckHandler(false) : setCheckHandler(true);
  setSelected([]);
};

const handleTrashcanBtn = (
  newSelected,
  setConfirmDeleteModalOpen,
  setSuccessRestoreModalOpen
) => {
  if (window.location.href.split("/main")[1] === "/trashcan") {
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <EnrollBtn
          variant="contained"
          endIcon={<Outbox />}
          onClick={() => {
            restoreFile(newSelected);
            setSuccessRestoreModalOpen(true);
          }}
          style={{ marginRight: "10px" }}
        >
          내 문서함으로 이동
        </EnrollBtn>
        <ToRecyclebin
          variant="contained"
          startIcon={<Delete />}
          onClick={() => setConfirmDeleteModalOpen(true)}
        >
          영구 삭제
        </ToRecyclebin>
      </div>
    );
  } else {
    return (
      <ToRecyclebin
        variant="contained"
        startIcon={<Delete />}
        onClick={() => setConfirmDeleteModalOpen(true)}
      >
        휴지통으로
      </ToRecyclebin>
    );
  }
};

const DmTableToolbar = ({
  numSelected,
  newSelected,
  setSelected,
  documentUrl,
  setList,
  setSearchData,
  // documentInfo,
}) => {
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [successDeleteModalOpen, setSuccessDeleteModalOpen] = useState(false);
  const [successRestoreModalOpen, setSuccessRestoreModalOpen] = useState(false);
  const [writeModalOpen, setWriteModalOpen] = useState(false);

  const { check, setCheckHandler } = useContext(MyContext);

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent:
            "space-between" /**검색과 문서등록 버튼 떼어놓으려고 css 작업 */,
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Box
            /**영훈이가 거슬려했던 Toolbar와 table head 너비차이 조절 */
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
              flex: "1 1 100%",
            }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>
                <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  {numSelected}
                </span>
                개가 선택되었습니다
              </Typography>
              {handleTrashcanBtn(
                newSelected,
                setConfirmDeleteModalOpen,
                setSuccessRestoreModalOpen
              )}
            </div>
          </Box>
        ) : (
          // 09.01 파일 검색과 문서등록 버튼 배치 조절
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "12px",
              }} /*영훈이가 거슬려했던 Toolbar와 table head 너비차이 조절 */
            >
              <TextField
                id="searchDocumentName"
                label="파일 검색"
                sx={{ marginRight: "20px" }}
              />
              <Button
                variant="outlined"
                sx={{ fontSize: "1rem" }}
                endIcon={<SearchOutlined />}
                onClick={() => {
                  const searchName = document.getElementById(
                    "searchDocumentName"
                  ).value;
                  if (searchName) {
                    searchDocument(
                      getUser().userNo,
                      searchName,
                      documentUrl ? documentUrl : "",
                      setList
                    );
                    setSearchData(searchName);
                  }
                  console.log(searchName);
                }}
              >
                검색
              </Button>
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              {/**margin 조절 */}
              {handleToolbarBtn(writeModalOpen, setWriteModalOpen)}
            </Box>
          </React.Fragment>
        )}
      </Toolbar>
      {(() => {
        switch (window.location.href.split("/main")[1]) {
          case "/trashcan":
            return (
              <ConfirmModal
                open={confirmDeleteModalOpen}
                setOpen={setConfirmDeleteModalOpen}
                act={() => {
                  deleteFile(newSelected);
                  setConfirmDeleteModalOpen(false);
                  setSuccessDeleteModalOpen(true);
                }}
              >
                <Box>
                  <Typography>
                    선택된 파일들을 영구 삭제 하시겠습니까?
                  </Typography>
                  <Typography>영구 삭제시 복원이 불가능 합니다.</Typography>
                </Box>
              </ConfirmModal>
            );
          default:
            return (
              <ConfirmModal
                open={confirmDeleteModalOpen}
                setOpen={setConfirmDeleteModalOpen}
                act={() => {
                  updateRecycleBinFile(newSelected);
                  setConfirmDeleteModalOpen(false);
                  setSuccessDeleteModalOpen(true);
                }}
              >
                <Box>
                  <Typography>삭제 하시겠습니까?</Typography>
                </Box>
              </ConfirmModal>
            );
        }
      })()}

      <SucessModal
        open={successDeleteModalOpen}
        close={() =>
          closeSuccessModal(
            setSuccessDeleteModalOpen,
            check,
            setCheckHandler,
            setSelected
          )
        }
      >
        <Box>
          <Typography>삭제 완료</Typography>
        </Box>
      </SucessModal>

      <SucessModal
        open={successRestoreModalOpen}
        close={() =>
          closeSuccessModal(
            setSuccessRestoreModalOpen,
            check,
            setCheckHandler,
            setSelected
          )
        }
      >
        <Box>
          <Typography>복원 완료</Typography>
        </Box>
      </SucessModal>

      <WriteModal open={writeModalOpen} setWriteModal={setWriteModalOpen}>
        <Typography>파일 선택</Typography>
      </WriteModal>
    </React.Fragment>
  );
};

export default DmTableToolbar;
