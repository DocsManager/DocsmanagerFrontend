import React, { useContext, useState, createContext } from "react";
import ConfirmModal from "./ConfirmModal";
import SucessModal from "./SucessModal";
import "./Modal.css";
import {
  deleteFile,
  restoreFile,
  updateContent,
  updateRecycleBinFile,
} from "../../api/documentApi";
import { MyContext } from "./DmTable";
import WriteModal from "./WriteModal";
import UpdateContent from "./UpdateContent";
import UpdateFile from "./UpdateFile";
import ShareUser from "./ShareUser";
import AddMember from "./AddMember";

const openConfirmModal = (setConfirmModalOpen, confirmModalOpen) => {
  confirmModalOpen === true
    ? setConfirmModalOpen(false)
    : setConfirmModalOpen(true);
};

const openSuccessModal = (
  setSuccessModalOpen,
  infoModalOpen,
  check,
  setCheckHandler
) => {
  setSuccessModalOpen(false);
  infoModalOpen(false);
  check ? setCheckHandler(false) : setCheckHandler(true);
};

const closeRestoreModal = (
  setSuccessModalOpen,
  infoModalOpen,
  check,
  setCheckHandler
) => {
  setSuccessModalOpen(false);
  infoModalOpen(false);
  check ? setCheckHandler(false) : setCheckHandler(true);
};

const closePermanentlyDeleteModal = (
  setPermanentlyDeleteModalOpen,
  infoModalOpen,
  check,
  setCheckHandler
) => {
  setPermanentlyDeleteModalOpen(false);
  infoModalOpen(false);
  check ? setCheckHandler(false) : setCheckHandler(true);
};

const closeInfoModal = (infoModalOpen) => {
  infoModalOpen(false);
};

const updateOpenModal = (updateModalOpen, setUpdateModalOpen) => {
  updateModalOpen ? setUpdateModalOpen(false) : setUpdateModalOpen(true);
};

const updateFileModal = (updateFileOpen, setUpdateFileOpen) => {
  updateFileOpen ? setUpdateFileOpen(false) : setUpdateFileOpen(true);
};

const Modal = (props) => {
  const { open, document, infoModalOpen } = props;
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [permanentlyDeleteModalOpen, setPermanentlyDeleteModalOpen] = useState(
    false
  );
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateFileOpen, setUpdateFileOpen] = useState(false);
  const [openShareAdd, setOpenShareAdd] = useState(false);

  const { check, setCheckHandler } = useContext(MyContext);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div>
      <span>{props.name}</span>
      <span className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              {document.documentNo.originalName}
              {(() => {
                switch (window.location.href.split("/main")[1]) {
                  case "/trashcan":
                    return (
                      <button
                        className="close"
                        onClick={() =>
                          restoreFile(
                            [document.documentNo.documentNo],
                            setSuccessModalOpen
                          )
                        }
                      >
                        복원
                      </button>
                    );
                  default:
                    return (
                      <span>
                        <a href={document.documentNo.filePath}>
                          <button className="close">저장</button>
                        </a>
                        {document.authority !== "READ" ? (
                          <button
                            className="close"
                            onClick={() => {
                              updateOpenModal(
                                updateModalOpen,
                                setUpdateModalOpen
                              );
                            }}
                          >
                            수정
                          </button>
                        ) : (
                          <></>
                        )}
                      </span>
                    );
                }
              })()}
              {document.authority === "MASTER" ? (
                <button className="close" onClick={() => setOpenShareAdd(true)}>
                  공유
                </button>
              ) : (
                <></>
              )}

              <button
                className="close"
                onClick={() => {
                  openConfirmModal(setConfirmModalOpen, confirmModalOpen);
                }}
              >
                삭제
              </button>
            </header>
            <main>
              {document.documentNo.content
                ? document.documentNo.content
                : "문서 내용이 없습니다."}
            </main>
            <footer>
              <button
                className="close"
                onClick={() => closeInfoModal(infoModalOpen)}
              >
                닫기
              </button>
              {/* <button
                className="close"
                onClick={() => {
                  updateFileModal(updateFileOpen, setUpdateFileOpen);
                }}
              >
                파일 변경
              </button> */}
            </footer>
          </section>
        ) : null}
      </span>

      <div>
        {(() => {
          switch (window.location.href.split("/main")[1]) {
            case "/trashcan":
              return (
                <ConfirmModal
                  open={confirmModalOpen}
                  close={() =>
                    openConfirmModal(setConfirmModalOpen, confirmModalOpen)
                  }
                  successModalOpen={successModalOpen}
                  act={() =>
                    deleteFile(
                      [document.documentNo.documentNo],
                      setConfirmModalOpen,
                      setPermanentlyDeleteModalOpen
                    )
                  }
                >
                  <main>
                    <div>영구 삭제 하시겠습니까?</div>
                    <div>영구 삭제시 복원이 불가능 합니다.</div>
                  </main>
                </ConfirmModal>
              );
            default:
              return (
                <ConfirmModal
                  open={confirmModalOpen}
                  close={() =>
                    openConfirmModal(setConfirmModalOpen, confirmModalOpen)
                  }
                  delclose={() =>
                    openSuccessModal(setSuccessModalOpen, infoModalOpen)
                  }
                  successModalOpen={successModalOpen}
                  act={() =>
                    updateRecycleBinFile(
                      [document.documentNo.documentNo],
                      setConfirmModalOpen,
                      setSuccessModalOpen
                    )
                  }
                >
                  <main>
                    <div>삭제하시겠습니까?</div>
                  </main>
                </ConfirmModal>
              );
          }
        })()}
      </div>
      {(() => {
        switch (window.location.href.split("/main")[1]) {
          case "/trashcan":
            return (
              <div>
                <SucessModal
                  open={successModalOpen}
                  close={() =>
                    closeRestoreModal(
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
                  open={permanentlyDeleteModalOpen}
                  close={() =>
                    closePermanentlyDeleteModal(
                      setPermanentlyDeleteModalOpen,
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
      {
        <UpdateContent
          open={updateModalOpen}
          close={() => openConfirmModal(setUpdateModalOpen, updateModalOpen)}
          successModalOpen={successModalOpen}
          document={document.documentNo}
          setUpdateModalOpen={setUpdateModalOpen}
          infoModalOpen={infoModalOpen}
          check={check}
          setCheckHandler={setCheckHandler}
        />
      }
      {
        <UpdateFile
          open={updateFileOpen}
          close={() => openConfirmModal(setUpdateFileOpen, updateFileOpen)}
          successModalOpen={successModalOpen}
          document={document.documentNo}
        />
      }
      {openShareAdd && (
        <AddMember
          open={openShareAdd}
          setOpen={setOpenShareAdd}
          row={document.documentNo}
          number={document.documentNo.documentNo}
          check={check}
          setCheck={setCheckHandler}
          type="document"
        />
      )}
    </div>
  );
};

export default Modal;
