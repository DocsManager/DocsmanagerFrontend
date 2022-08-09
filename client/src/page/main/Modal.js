import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import SucessModal from "./SucessModal";
import "./Modal.css";
import { updateRecycleBinFile } from "../../api/documentApi";

const openConfirmModal = (setConfirmModalOpen, confirmModalOpen) => {
  confirmModalOpen === true
    ? setConfirmModalOpen(false)
    : setConfirmModalOpen(true);
};

// const openSuccessModal = (setSuccessModalOpen, infoModalOpen) => {
//   setSuccessModalOpen(false);
//   infoModalOpen(false);
// };

const closeInfoModal = (infoModalOpen) => {
  infoModalOpen(false);
};

const Modal = (props) => {
  const { open, document, infoModalOpen } = props;
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div>
      <div>{props.name}</div>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              {document.originalName}
              <a href={document.filePath}>
                <button className="close">down</button>
              </a>
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
      {
        <ConfirmModal
          open={confirmModalOpen}
          close={() => openConfirmModal(setConfirmModalOpen, confirmModalOpen)}
          del={() =>
            updateRecycleBinFile(
              document.documentNo,
              setConfirmModalOpen,
              setSuccessModalOpen
            )
          }
          successModalOpen={successModalOpen}
          success={setSuccessModalOpen}
          info={infoModalOpen}
        >
          <main>
            <div>삭제하시겠습니까?</div>
          </main>
        </ConfirmModal>
      }
      {/* {
        <SucessModal
          open={successModalOpen}
          close={() => openSuccessModal(setSuccessModalOpen, infoModalOpen)}
        >
          <main>
            <div>삭제 완료</div>
          </main>
        </SucessModal>
      } */}
    </div>
  );
};

export default Modal;
