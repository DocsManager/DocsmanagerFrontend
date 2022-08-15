import React from "react";
import "./Modal.css";

const ConfirmModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴

  const { open, close, header, act } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>{header}</header>
            <main>{props.children}</main>
            <footer>
              <button className="close" onClick={close}>
                취소
              </button>
              <button className="close" onClick={act}>
                확인
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default ConfirmModal;
