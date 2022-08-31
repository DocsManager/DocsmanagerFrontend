import React, { useState, useContext } from "react";
import Toolbar from "@mui/material/Toolbar";
import { Delete, FolderSpecial, Outbox, Warning } from "@mui/icons-material";
import { Button, Typography, styled, TextField } from "@mui/material";
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
import { MyContext } from "./DmTable";
import WriteModal from "./WriteModal";
import { getUser } from "../../component/getUser/getUser";

//문서 등록, 중요 문서 안내 버튼 styled 컴포넌트로
const EnrollBtn = styled(Button)({
  backgroundColor: "#3791f8",
  marginLeft: "10px",
  outline: "none !important",
});

const handleToolbarBtn = (writeModalOpen, setWriteModalOpen) => {
  switch (window.location.href.split("/main")[1]) {
    case "/important":
      return (
        <EnrollBtn variant="contained" endIcon={<FolderSpecial />}>
          중요한 문서를 관리해보세요!
        </EnrollBtn>
      );

    case "/trashcan":
      return (
        <EnrollBtn variant="contained" endIcon={<Warning />}>
          휴지통에서 삭제되면 복원할 수 없습니다!
        </EnrollBtn>
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
        <Button
          variant="outlined"
          startIcon={<Delete />}
          onClick={() => setConfirmDeleteModalOpen(true)}
        >
          영구 삭제
        </Button>
      </div>
    );
  } else {
    return (
      <Button
        variant="outlined"
        startIcon={<Delete />}
        onClick={() => setConfirmDeleteModalOpen(true)}
      >
        휴지통으로
      </Button>
    );
  }
};

const DmTableToolbar = ({
  numSelected,
  newSelected,
  setSelected,
  documentUrl,
  setList,
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
        <TextField id="searchDocumentName" label="파일 검색" />
        <Button
          onClick={() => {
            const searchName = document.getElementById("searchDocumentName")
              .value;
            searchName &&
              searchDocument(
                getUser().userNo,
                searchName,
                documentUrl ? documentUrl : "",
                setList
              );
            // console.log(list);
          }}
        >
          검색
        </Button>
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: " 1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {numSelected}개가 선택되었습니다
              {handleTrashcanBtn(
                newSelected,
                setConfirmDeleteModalOpen,
                setSuccessRestoreModalOpen
              )}
            </div>
          </Typography>
        ) : (
          <div>{handleToolbarBtn(writeModalOpen, setWriteModalOpen)}</div>
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
                  // console.log(documentInfo);
                  // console.log(newSelected);
                  // documentInfo.authority === "MASTER"
                  //   ? masterDeleteFile(newSelected)
                  //   : deleteFile(newSelected);
                  setConfirmDeleteModalOpen(false);
                  setSuccessDeleteModalOpen(true);
                }}
              >
                <main>
                  <div>선택된 파일들을 영구 삭제 하시겠습니까?</div>
                  <div>영구 삭제시 복원이 불가능 합니다.</div>
                </main>
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
                <main>
                  <div>삭제 하시겠습니까?</div>
                </main>
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
        <main>
          <div>삭제 완료</div>
        </main>
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
        <main>
          <div>복원 완료</div>
        </main>
      </SucessModal>

      <WriteModal open={writeModalOpen} setWriteModal={setWriteModalOpen}>
        <div>파일 선택</div>
      </WriteModal>
    </React.Fragment>
  );
};

export default DmTableToolbar;
