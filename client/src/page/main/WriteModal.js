import React, { useState } from "react";
import { writeFile } from "../../api/documentApi";
import "./Modal.css";

const WriteModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const { open, close, insert } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.

    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>문서 등록</header>
          <main>
            <div>{props.children}</div>
            <input
              type="file"
              id="fileUpload"
              onChange={(e) => setFile(e.target.value)}
            />
            <div>파일 설명</div>
            <input
              type="text"
              id="fileContent"
              onChange={(e) => setText(e.target.value)}
            />
          </main>
          <footer>
            <button className="close" onClick={close}>
              닫기
            </button>
            <button className="close" onClick={() => writeFile(file, text)}>
              저장
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default WriteModal;
