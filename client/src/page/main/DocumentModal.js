import React, { useContext, useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import SucessModal from "./SucessModal";
import "./Modal.css";
import {
  deleteFile,
  documentMember,
  fileDownload,
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
import { fileCategoryIcon } from "./DmTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { WorkspaceButton } from "../workspace/AddWorkspace";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

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
  setCheckHandler(!check);
};

const DocumentModal = (props) => {
  const { open, document, infoModalOpen } = props;
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [deleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [openShareAdd, setOpenShareAdd] = useState(false);
  const [documentShareModal, setDocumentShareModal] = useState(false);
  const { check, setCheckHandler, userInfo } = useContext(MyContext);
  const [member, setMember] = useState([]);
  useEffect(() => {
    documentMember(document.documentNo.documentNo, setMember);
  }, [document.documentNo.documentNo]);
  return (
    <div>
      <Modal
        open={open}
        onClose={() => infoModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h4"
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            {(() => {
              switch (window.location.href.split("/main")[1]) {
                case "/trashcan":
                  return (
                    <Button
                      onClick={() => {
                        restoreFile([document], userInfo);
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
                      {/* <a
                        href={document.documentNo.filePath}
                        download={document.documentNo.originalName}
                      > */}
                      <Button
                        onClick={() =>
                          fileDownload(
                            document.documentNo.filePath,
                            document.documentNo.originalName
                          )
                        }
                      >
                        <FileDownloadIcon />
                      </Button>
                      {/* </a> */}
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {fileCategoryIcon(document.documentNo.fileCategory)}
            <Typography
              variant="h6"
              component="h2"
              marginLeft={"10px"}
              marginTop={"3px"}
            >
              {document.documentNo.originalName}
            </Typography>
          </Box>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {document.documentNo.content
              ? document.documentNo.content
              : "내용이 없습니다."}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
            mt={2}
          >
            <WorkspaceButton
              variant="contained"
              onClick={() => infoModalOpen(false)}
            >
              닫기
              <CloseOutlinedIcon />
            </WorkspaceButton>
          </Typography>
        </Box>
      </Modal>

      <UpdateContent
        open={updateModalOpen}
        setOpen={setUpdateModalOpen}
        successModalOpen={successModalOpen}
        document={document.documentNo}
        infoModalOpen={infoModalOpen}
        member={member}
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
                  if (document.authority === "MASTER") {
                    const content = `${userInfo.name}님께서 공유하신 ${
                      document.documentNo.originalName
                    } 문서를 삭제하셨습니다. `;
                    // notipublish(member, userInfo, content, "delete");
                    console.log(member);
                    masterDeleteFile(
                      document.documentNo.documentNo,
                      userInfo,
                      content
                    );
                  } else {
                    deleteFile([document.documentNo.documentNo], userInfo);
                  }
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
                  updateRecycleBinFile([document], userInfo);
                  setConfirmModalOpen(false);
                  setSuccessModalOpen(true);
                  infoModalOpen(false);
                  // dtoList === 0 ? setPage(page - 1) : setPage(page);
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
                  close={() => {
                    openSuccessModal(
                      setDeleteSuccessModalOpen,
                      infoModalOpen,
                      check,
                      setCheckHandler
                    );
                  }}
                >
                  <main>
                    <div>영구 삭제 완료</div>
                  </main>
                </SucessModal>
              </div>
            );
          default:
            return (
              <SucessModal
                open={successModalOpen}
                close={() => {
                  openSuccessModal(
                    setSuccessModalOpen,
                    infoModalOpen,
                    check,
                    setCheckHandler
                  );

                  // dtoList === 0 ? setPage(page - 1) : setPage(page);
                }}
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
