import React, { useState, useContext } from "react";
import Toolbar from "@mui/material/Toolbar";
import { Delete, FolderSpecial, Outbox, Warning } from "@mui/icons-material";
import { Button, Typography, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  deleteFile,
  restoreFile,
  updateRecycleBinFile,
  writeFile,
} from "../../api/documentApi";
import ConfirmModal from "./ConfirmModal";
import SucessModal from "./SucessModal";
import { MyContext } from "./DmTable";
import WriteModal from "./WriteModal";

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

const openDeleteModal = (confirmDeleteModalOpen, setConfirmDeleteModalOpen) => {
  confirmDeleteModalOpen === true
    ? setConfirmDeleteModalOpen(false)
    : setConfirmDeleteModalOpen(true);
};

const closeSuccessModal = (
  setSuccessDeleteModalOpen,
  check,
  setCheckHandler,
  setSelected
) => {
  setSuccessDeleteModalOpen(false);
  check ? setCheckHandler(false) : setCheckHandler(true);
  setSelected([]);
};

const closeRestoreSuccessModal = (
  setSuccessRestoreModalOpen,
  check,
  setCheckHandler,
  setSelected
) => {
  setSuccessRestoreModalOpen(false);
  check ? setCheckHandler(false) : setCheckHandler(true);
  setSelected([]);
};

const wirteOpen = (writeModalOpen, setWriteModalOpen) => {
  writeModalOpen ? setWriteModalOpen(false) : setWriteModalOpen(true);
};

const handleTrashcanBtn = (
  newSelected,
  confirmDeleteModalOpen,
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
            restoreFile(newSelected, setSuccessRestoreModalOpen);
          }}
          style={{ marginRight: "10px" }}
        >
          내 문서함으로 이동
        </EnrollBtn>
        <ToRecyclebin
          variant="contained"
          startIcon={<Delete />}
          onClick={() => {
            openDeleteModal(confirmDeleteModalOpen, setConfirmDeleteModalOpen);
          }}
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
        onClick={() => {
          openDeleteModal(confirmDeleteModalOpen, setConfirmDeleteModalOpen);
        }}
      >
        휴지통으로
      </ToRecyclebin>
    );
  }
};

const DmTableToolbar = ({ numSelected, newSelected, setSelected }) => {
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [successDeleteModalOpen, setSuccessDeleteModalOpen] = useState(false);
  const [successRestoreModalOpen, setSuccessRestoreModalOpen] = useState(false);
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  // const [writeSuccessModalOpen, setWriteSuccessModalOpen] = useState(false);

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
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: " 1 1 100%" }}
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
                confirmDeleteModalOpen,
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
                close={() => {
                  openDeleteModal(
                    confirmDeleteModalOpen,
                    setConfirmDeleteModalOpen
                  );
                }}
                act={() =>
                  deleteFile(
                    newSelected,
                    setConfirmDeleteModalOpen,
                    setSuccessDeleteModalOpen
                  )
                }
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
                close={() => {
                  openDeleteModal(
                    confirmDeleteModalOpen,
                    setConfirmDeleteModalOpen
                  );
                }}
                act={() =>
                  updateRecycleBinFile(
                    newSelected,
                    setConfirmDeleteModalOpen,
                    setSuccessDeleteModalOpen
                  )
                }
              >
                <main>
                  <div>삭제 하시겠습니까?</div>
                </main>
              </ConfirmModal>
            );
        }
      })()}

      {
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
      }
      {
        <SucessModal
          open={successRestoreModalOpen}
          close={() =>
            closeRestoreSuccessModal(
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
      }
      {
        <WriteModal
          open={writeModalOpen}
          close={() => wirteOpen(writeModalOpen, setWriteModalOpen)}
          setWriteModal={setWriteModalOpen}
        >
          <div>파일 선택</div>
        </WriteModal>
      }
      {/* {
        <SucessModal
          open={writeSuccessModalOpen}
          close={() => {
            setWriteModalOpen(false);
            setWriteSuccessModalOpen(false);
          }}
        >
          <main>
            <div>저장 완료</div>
          </main>
        </SucessModal>
      } */}
    </React.Fragment>
  );
};

export default DmTableToolbar;
