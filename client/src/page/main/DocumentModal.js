import React, { useContext, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import SucessModal from "./SucessModal";
import "./Modal.css";
import {
  deleteFile,
  masterDeleteFile,
  restoreFile,
  updateRecycleBinFile,
} from "../../api/documentApi";
import { MyContext } from "../Main";
import UpdateContent from "./UpdateContent";
import AddMember from "./AddMember";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
import RestorePageIcon from "@mui/icons-material/RestorePage";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

const openSuccessModal = (modalOpen, infoModalOpen, check, setCheckHandler) => {
  modalOpen(false);
  infoModalOpen(false);
  check ? setCheckHandler(false) : setCheckHandler(true);
};

const DocumentModal = (props) => {
  const { open, document, infoModalOpen } = props;
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [deleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [openShareAdd, setOpenShareAdd] = useState(false);
  const [documentShareModal, setDocumentShareModal] = useState(false);

  const { check, setCheckHandler } = useContext(MyContext);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => infoModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={{ ...style, minWidth: "700px", maxWidth: "800px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {console.log(document)}
              {document.documentNo.originalName}
            </Typography>
            <Box> */}
        <Box sx={{ ...style, width: 500 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {console.log(document)}
            {document.documentNo.originalName}
            {(() => {
              switch (window.location.href.split("/main")[1]) {
                case "/trashcan":
                  return (
                    <Button
                      onClick={() => {
                        restoreFile([document]);
                        setSuccessModalOpen(true);
                        infoModalOpen(false);
                      }}
                    >
                      <RestorePageIcon />
                    </Button>
                  );
                default:
                  return (
                    <span>
                      <a
                        href={document.documentNo.filePath}
                        download={document.documentNo.originalName}
                      >
                        <Button>
                          <FileDownloadIcon />
                        </Button>
                      </a>
                      {document.authority !== "READ" ? (
                        <Button onClick={() => setUpdateModalOpen(true)}>
                          <EditIcon />
                        </Button>
                      ) : (
                        <></>
                      )}
                    </span>
                  );
              }
            })()}

            {document.authority === "MASTER" ? (
              (() => {
                switch (window.location.href.split("/main")[1]) {
                  case "/trashcan":
                    return <></>;
                  default:
                    return (
                      <Button onClick={() => setOpenShareAdd(true)}>
                        <PersonAddAlt1Icon />
                      </Button>
                    );
                }
              })()
            ) : (
              <></>
            )}

            <Button onClick={() => setConfirmModalOpen(true)}>
              <DeleteIcon />
            </Button>
            {/* </Box>
          </Box> */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {document.documentNo.content
              ? document.documentNo.content
              : "내용이 없습니다."}
          </Typography>
          <Button onClick={() => infoModalOpen(false)}>닫기</Button>
        </Box>
      </Modal>

      <UpdateContent
        open={updateModalOpen}
        setOpen={setUpdateModalOpen}
        successModalOpen={successModalOpen}
        document={document.documentNo}
        infoModalOpen={infoModalOpen}
      />

      {openShareAdd && (
        <AddMember
          open={openShareAdd}
          setOpen={setOpenShareAdd}
          infoModalOpen={infoModalOpen}
          setDocumentShareModal={setDocumentShareModal}
          row={document.documentNo}
          number={document.documentNo.documentNo}
          check={check}
          setCheck={setCheckHandler}
          type="document"
        />
      )}

      {(() => {
        switch (window.location.href.split("/main")[1]) {
          case "/trashcan":
            return (
              <ConfirmModal
                open={confirmModalOpen}
                setOpen={setConfirmModalOpen}
                act={() => {
                  document.authority === "MASTER"
                    ? masterDeleteFile([document.documentNo.documentNo])
                    : deleteFile([document.documentNo.documentNo]);
                  setConfirmModalOpen(false);
                  setDeleteSuccessModalOpen(true);
                  infoModalOpen(false);
                }}
              >
                <main>
                  <div>영구 삭제 하시겠습니까?</div>
                  <div>※ 영구 삭제시 복원이 불가능 합니다.</div>
                </main>
              </ConfirmModal>
            );
          default:
            return (
              <ConfirmModal
                open={confirmModalOpen}
                setOpen={setConfirmModalOpen}
                act={() => {
                  updateRecycleBinFile([document]);
                  setConfirmModalOpen(false);
                  setSuccessModalOpen(true);
                  infoModalOpen(false);
                }}
              >
                <main>
                  <div>삭제 하시겠습니까?</div>
                </main>
              </ConfirmModal>
            );
        }
      })()}

      {(() => {
        switch (window.location.href.split("/main")[1]) {
          case "/trashcan":
            return (
              <div>
                <SucessModal
                  open={successModalOpen}
                  close={() =>
                    openSuccessModal(
                      setSuccessModalOpen,
                      infoModalOpen,
                      check,
                      setCheckHandler
                    )
                  }
                >
                  <main>
                    <div>복원 완료</div>
                  </main>
                </SucessModal>
                <SucessModal
                  open={deleteSuccessModalOpen}
                  close={() =>
                    openSuccessModal(
                      setDeleteSuccessModalOpen,
                      infoModalOpen,
                      check,
                      setCheckHandler
                    )
                  }
                >
                  <main>
                    <div>삭제 완료</div>
                  </main>
                </SucessModal>
              </div>
            );
          default:
            return (
              <SucessModal
                open={successModalOpen}
                close={() =>
                  openSuccessModal(
                    setSuccessModalOpen,
                    infoModalOpen,
                    check,
                    setCheckHandler
                  )
                }
              >
                <main>
                  <div>삭제 완료</div>
                </main>
              </SucessModal>
            );
        }
      })()}
      <SucessModal
        open={documentShareModal}
        close={() => {
          setDocumentShareModal(false);
        }}
      >
        <main>
          <div>공유 완료</div>
        </main>
      </SucessModal>
    </div>
  );
};

export default DocumentModal;
