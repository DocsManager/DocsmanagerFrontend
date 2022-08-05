import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import DelModal from "./DelModal";
import axios from "axios";
import SucessModal from "./SucessModal";

const getList = (setList, page) => {
  axios
    .get("http://localhost:8080/api/documents/" + 1 + "?page=" + page)
    .then((res) => {
      setList(res.data);
      console.log(res.data);
    });
};

const openModal = (setModalOpen, documentNo, setDocument) => {
  setModalOpen(true);
  axios
    .get("http://localhost:8080/api/document/" + documentNo)
    .then((res) => setDocument(res.data));
};
const closeModal = (setModalOpen) => {
  setModalOpen(false);
};

const deleteFile = (setModalOpen, setModalOpen2, setModalOpen3, documentNo) => {
  axios
    .delete("http://localhost:8080/api/document/" + documentNo)
    .then(setModalOpen(false));
  setModalOpen2(false);
  setModalOpen3(true);
};

const openModal2 = (setModalOpen2) => {
  setModalOpen2(true);
};
const closeModal2 = (setModalOpen2) => {
  setModalOpen2(false);
};
const closeModal3 = (setModalOpen3, setModalOpen) => {
  setModalOpen3(false);
  setModalOpen(false);
};
function MyBox() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);

  const [document, setDocument] = useState("");

  const [page, setPage] = useState(1);
  const [list, setList] = useState("");

  useEffect(() => {
    getList(setList, page);
  }, [page, modalOpen3]);
  return (
    <React.Fragment>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {list.dtoList &&
              list.dtoList.map((docs) => {
                return (
                  <tr key={docs.documentNo}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td
                      onClick={() =>
                        openModal(setModalOpen, docs.documentNo, setDocument)
                      }
                    >
                      {docs.originalName}
                    </td>
                    <td>{docs.user && docs && docs.user.name}</td>
                    <td>{docs.registerDate && docs && docs.registerDate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div>
          <button
            onClick={() =>
              setPage(
                list.start - list.size >= 1 ? list.start - list.size : page
              )
            }
          >
            이전
          </button>

          {list &&
            list.pageList.map((listPage) => {
              return (
                <span
                  className={page === listPage ? "pageNum" : "pageOut"}
                  onClick={() => {
                    setPage(listPage);
                  }}
                  key={listPage}
                >
                  {listPage}
                </span>
              );
            })}
          <button
            onClick={() =>
              setPage(
                list.start + list.size > list.totalPage
                  ? page
                  : list.start + list.size
              )
            }
          >
            다음
          </button>
        </div>
      </div>

      <Modal
        open={modalOpen}
        close={() => closeModal(setModalOpen)}
        header={document.originalName}
        down={document.filePath}
        open2={() => openModal2(setModalOpen2)}
      >
        <main>
          <div>{document.content}</div>
        </main>
      </Modal>
      <DelModal
        open={modalOpen2}
        close={() => closeModal2(setModalOpen2)}
        del={() =>
          deleteFile(
            setModalOpen,
            setModalOpen2,
            setModalOpen3,
            document.documentNo
          )
        }
      >
        <main>
          <div>삭제하시겠습니까?</div>
        </main>
      </DelModal>
      <SucessModal
        open={modalOpen3}
        close={() => closeModal3(setModalOpen3, setModalOpen)}
      >
        <main>
          <div>삭제 완료</div>
        </main>
      </SucessModal>
    </React.Fragment>
  );
}

export default MyBox;
