import React, { useState } from "react";
import "./Modal.css";
import { updateContent } from "../../api/documentApi";
import SucessModal from "./SucessModal";

const openUpdateConfirmModal = (
  contentUpdateModal,
  setContentUpdateModal,
  setUpdateModalOpen
) => {
  contentUpdateModal
    ? setContentUpdateModal(false)
    : setContentUpdateModal(true);
};

const UpdateContent = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const [content, setContent] = useState("");
  const [contentUpdateModal, setContentUpdateModal] = useState(false);
  const {
    open,
    close,
    header,
    document,
    setUpdateModalOpen,
    infoModalOpen,
    check,
    setCheckHandler,
  } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>내용 수정</header>
            <main>
              <input
                type="text"
                defaultValue={document.content}
                onChange={(e) => setContent(e.target.value)}
              />
            </main>
            <footer>
              <button className="close" onClick={close}>
                취소
              </button>
              <button
                className="close"
                onClick={() => {
                  openUpdateConfirmModal(
                    contentUpdateModal,
                    setContentUpdateModal
                  );
                  updateContent(document.documentNo, content);
                  setUpdateModalOpen(false);
                }}
              >
                확인
              </button>
            </footer>
          </section>
        ) : null}
      </div>
      {
        <SucessModal
          open={contentUpdateModal}
          close={() => {
            openUpdateConfirmModal(contentUpdateModal, setContentUpdateModal);
            infoModalOpen(false);
            check ? setCheckHandler(false) : setCheckHandler(true);
          }}
        >
          <main>
            <div>수정 완료</div>
          </main>
        </SucessModal>
      }
    </div>
  );
};

export default UpdateContent;
