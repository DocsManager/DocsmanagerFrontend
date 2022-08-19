import React, { useState, useContext, useEffect } from "react";
import { writeFile } from "../../api/documentApi";
import { allUser } from "../../api/userApi";
import { getUser, setUser } from "../../component/getUser/getUser";
import ConfirmModal from "./ConfirmModal";
import "./Modal.css";
import SucessModal from "./SucessModal";
import { MyContext } from "./DmTable";
import { List } from "@mui/material";
import ShareUser from "./ShareUser";

const openWriteConfirm = (writeConfirm, setWriteConfirm) => {
  writeConfirm ? setWriteConfirm(false) : setWriteConfirm(true);
};

const openNoFileConfirm = (fileNull, setFileNull) => {
  fileNull ? setFileNull(false) : setFileNull(true);
};

const openSuccessWriteModal = (setWriteConfirm, setWriteSuccessConfirm) => {
  setWriteConfirm(false);
  setWriteSuccessConfirm(true);
};

const successWrite = (
  setWriteModal,
  setWriteSuccessConfirm,
  setWriteConfirm,
  check,
  setCheckHandler,
  setFile
) => {
  setWriteModal(false);
  setWriteSuccessConfirm(false);
  setWriteConfirm(false);
  check ? setCheckHandler(false) : setCheckHandler(true);
  setFile("");
};

const WriteModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [writeConfirm, setWriteConfirm] = useState(false);
  const [writeSuccessConfirm, setWriteSuccessConfirm] = useState(false);
  const [fileNull, setFileNull] = useState(false);
  const [searchList, setSearchList] = useState([]);
  // const [userList, setUserList] = useState([]);
  const { open, close, setWriteModal } = props;

  // useEffect(() => {
  //   // getList(setList, props.documentUrl ? props.documentUrl : "");
  //   allUser(setUserList);
  // }, []);

  const user = getUser();
  const documentDTO = {
    user: {
      userNo: user.userNo,
      dept: {
        deptNo: user.dept.deptNo,
      },
    },
    content: text,
  };
  //   const documentUser = [
  //     {
  //         userNo:
  //         {
  //             userNo: user.userNo,
  //             dept:
  //                 {
  //                     deptNo:user.dept.deptNo
  //                 }
  //         },
  //     documentNo:
  //         {user:
  //             {userNo:user.userNo
  //             ,dept:
  //                 {deptNo:user.dept.deptNo}
  //             }
  //         },
  //     authority:"MASTER"
  //     }
  // ]
  const { check, setCheckHandler } = useContext(MyContext);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <React.Fragment>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>문서 등록</header>
            <main>
              <div>{props.children}</div>
              <input
                type="file"
                id="fileUpload"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <ShareUser
                searchList={searchList}
                setSearchList={setSearchList}
                type="document"
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
              <button
                className="close"
                onClick={() =>
                  file
                    ? openWriteConfirm(writeConfirm, setWriteConfirm)
                    : openNoFileConfirm(fileNull, setFileNull)
                }
              >
                저장
              </button>
            </footer>
          </section>
        ) : null}
      </div>

      <ConfirmModal
        open={writeConfirm}
        close={() => openWriteConfirm(writeConfirm, setWriteConfirm)}
        // successModalOpen={successModalOpen}
        act={() => {
          {
            writeFile(file, documentDTO);
            openSuccessWriteModal(setWriteConfirm, setWriteSuccessConfirm);
          }
        }}
      >
        <main>
          <div>등록 하시겠습니까?</div>
        </main>
      </ConfirmModal>
      <SucessModal
        open={writeSuccessConfirm}
        close={() =>
          successWrite(
            setWriteModal,
            setWriteSuccessConfirm,
            setWriteConfirm,
            check,
            setCheckHandler,
            setFile
          )
        }
      >
        <main>
          <div>작성 완료</div>
        </main>
      </SucessModal>
      {
        <SucessModal
          open={fileNull}
          close={() => openNoFileConfirm(fileNull, setFileNull)}
        >
          <main>
            <div>파일이 없습니다.</div>
          </main>
        </SucessModal>
      }
    </React.Fragment>
  );
};

export default WriteModal;
