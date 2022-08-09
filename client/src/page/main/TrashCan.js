import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, styled, Pagination } from "@mui/material";
import DmTable from "./DmTable";

const getList = (setList, page) => {
  axios
    .get("/api/documents/" + 5 + "?page=" + 1)
    .then((res) => res.data)
    .then((datas) => {
      datas.dtoList.map(
        (data, index) => (
          (data.id = index + 1), (data.userName = data.user.name)
        )
      );
      setList(datas.dtoList);
    });
};

const columns = [
  {
    field: "originalName",
    headerName: "제목",
    width: 400,
    headerAlign: "center",
  },

  {
    field: "userName",

    headerName: "작성자",
    width: 100,
    headerAlign: "center",
  },
  {
    field: "registerDate",
    headerName: "등록일",
    type: "date",
    width: 200,
    headerAlign: "center",
  },
  {
    field: "modifyDate",
    headerName: "수정일",
    type: "date",
    width: 200,
    headerAlign: "center",
  },
];
const EnrollBtn = styled(Button)({
  backgroundColor: "#3791f8",
  marginLeft: "10px",
});

export default function Table() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  //   console.log(rows);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [document, setDocument] = useState("");

  //   const [openModal, setOpenModal] = useState(false);
  const [openSecModal, setOpenSecModal] = useState(false);

  const openModal = (documentNo) => {
    setModalOpen(true);
    axios.get("/api/document/" + 5).then((res) => setDocument(res.data));
  };
  console.log(document);

  const openModal2 = (setModalOpen2) => {
    setModalOpen2(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getList(setList);
    console.log(list);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateRows: "0.3fr 3fr" }}>
      <h2 style={{ textAlign: "left", padding: "15px" }}>휴지통</h2>
      <DmTable />
    </div>
  );
}
