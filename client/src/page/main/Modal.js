import React, { useContext, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import SucessModal from "./SucessModal";
import "./Modal.css";
import {
  deleteFile,
  restoreFile,
  updateRecycleBinFile,
} from "../../api/documentApi";
import { MyContext } from "./DmTable";

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

const Modal = (props) => {
  const { open, document, infoModalOpen } = props;
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [permanentlyDeleteModalOpen, setPermanentlyDeleteModalOpen] = useState(
    false
  );

  const { check, setCheckHandler } = useContext(MyContext);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div>
      <div>{props.name}</div>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              {document.originalName}
              {(() => {
                switch (window.location.href.split("/main")[1]) {
                  case "/trashcan":
                    return (
                      <button
                        className="close"
                        onClick={() =>
                          restoreFile(
                            [document.documentNo],
                            setSuccessModalOpen
                          )
                        }
                      >
                        복원~~~
                      </button>
                    );
                  default:
                    return (
                      <div>
                        <a href={document.filePath}>
                          <button className="close">down</button>
                        </a>
                        <button className="close" onClick={() => {}}>
                          수정~~~
                        </button>
                      </div>
                    );
                }
              })()}

              <button
                className="close"
                onClick={() => {
                  openConfirmModal(setConfirmModalOpen, confirmModalOpen);
                }}
              >
                삭제
              </button>
            </header>
            <main>{document.content}</main>
            <footer>
              <button
                className="close"
                onClick={() => closeInfoModal(infoModalOpen)}
              >
                닫기
              </button>
            </footer>
          </section>
        ) : null}
      </div>

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
                  delclose={() =>
                    openSuccessModal(setSuccessModalOpen, infoModalOpen)
                  }
                  successModalOpen={successModalOpen}
                  del={() =>
                    deleteFile(
                      [document.documentNo],
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
                  del={() =>
                    updateRecycleBinFile(
                      [document.documentNo],
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
    </div>
  );
};

export default Modal;
