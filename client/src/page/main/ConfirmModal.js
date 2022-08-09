import React from "react";
import SucessModal from "./SucessModal";
import "./Modal.css";

const openSuccessModal = (success, info) => {
  success(false);
  info(false);
};

const ConfirmModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, del, success, info, successModalOpen } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>{header}</header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={close}>
              취소
            </button>
            <button className="close" onClick={del}>
              확인
            </button>
          </footer>
        </section>
      ) : null}
      {
        <SucessModal
          open={successModalOpen}
          close={() => openSuccessModal(success, info)}
        >
          <main>
            <div>삭제 완료</div>
          </main>
        </SucessModal>
      }
    </div>
  );
};

export default ConfirmModal;
