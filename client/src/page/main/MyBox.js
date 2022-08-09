import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { getList, openInfoModal } from "../../api/documentApi";
import Page from "./Page";
import DelModal from "./DelModal";
import axios from "axios";
import SucessModal from "./SucessModal";
import DmTable from "./DmTable";

function MyBox() {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [document, setDocument] = useState("");
  const [page, setPage] = useState(1);
  const [list, setList] = useState("");

  useEffect(() => {
    getList(setList, page);
  }, [page, infoModalOpen]);
  return (
    <div style={{ display: "grid", gridTemplateRows: "0.3fr  3fr" }}>
      <h2 style={{ textAlign: "left", padding: "15px" }}>내 문서함</h2>
      <DmTable />
    </div>
  );
}

export default MyBox;
