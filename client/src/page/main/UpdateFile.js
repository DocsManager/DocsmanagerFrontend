import React, { useState } from "react";
import "./Modal.css";
import { updateFile } from "../../api/documentApi";

const UpdateFile = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const [updateFileVal, setUpdateFileVal] = useState("");

  const { open, close, header, document } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>{header}</header>
            <main>
              <input
                type="file"
                onChange={(e) => setUpdateFileVal(e.target.files[0])}
              />
            </main>
            <footer>
              <button className="close" onClick={close}>
                취소
              </button>
              <button
                className="close"
                onClick={() => updateFile(document.documentNo, updateFileVal)}
              >
                확인
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default UpdateFile;
