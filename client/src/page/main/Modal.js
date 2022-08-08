import React from "react";
import "./Modal.css";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, down, open2, name } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div>
      <div>{props.name}</div>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              {header}
              <a href={down}>
                <button className="close">down</button>
              </a>
              <button className="close" onClick={open2}>
                삭제
              </button>
            </header>
            <main>{props.children}</main>
            <footer>
              <button className="close" onClick={close}>
                닫기
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
