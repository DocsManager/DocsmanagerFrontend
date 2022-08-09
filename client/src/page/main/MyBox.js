import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import DelModal from "./DelModal";
import axios from "axios";
import SucessModal from "./SucessModal";
import DmTable from "./DmTable";

const getList = (setList, page) => {
  axios.get("/api/documents/" + 1 + "?page=" + page).then((res) => {
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
    <div style={{ display: "grid", gridTemplateRows: "0.3fr  3fr" }}>
      <h2 style={{ textAlign: "left", padding: "15px" }}>내 문서함</h2>
      <DmTable />
    </div>
  );
}

export default MyBox;
