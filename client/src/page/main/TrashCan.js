import React, { useState, useEffect } from "react";
import ConfirmModal from "./ConfirmModal";
import SucessModal from "./SucessModal";
import {
  deleteFile,
  getRecycleBinList,
  openModal,
  restoreFile,
} from "../../api/documentApi";
import Page from "./Page";

const openSuccessRestoreModal = (setRestoreSuccess) => {
  setRestoreSuccess(true);
};
const closeSuccessRestoreModal = (setRestoreSuccess) => {
  setRestoreSuccess(false);
};

const closeConfirmDeleteModal = (setDeleteConfirm) => {
  setDeleteConfirm(false);
};
const openConfirmDeleteModal = (setDeleteConfirm) => {
  setDeleteConfirm(true);
};

const openSuccessDeleteModal = (setDeleteSuccess) => {
  setDeleteSuccess(true);
};
const closeSuccessDeleteModal = (setDeleteSuccess, setDeleteConfirm) => {
  setDeleteSuccess(false);
  setDeleteConfirm(false);
};

function TrashCan() {
  useEffect(() => {
    getRecycleBinList(setList, page);
  }, [page, restoreSuccess, deleteSuccess]);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const [document, setDocument] = useState("");

  const [page, setPage] = useState(1);
  const [list, setList] = useState("");
  return (
    <div>
      <div>테이블~~</div>
      <Page list={list} page={page} setPage={setPage} />
      <div />
      <button onClick={() => openSuccessRestoreModal(setRestoreSuccess)}>
        복원
      </button>
      <button onClick={() => openConfirmDeleteModal(setDeleteConfirm)}>
        영구 삭제
      </button>
      <SucessModal
        open={restoreSuccess}
        close={() => closeSuccessRestoreModal(setRestoreSuccess)}
      >
        <main>
          <div>복원 완료</div>
        </main>
      </SucessModal>
      <ConfirmModal
        header="파일이름"
        open={deleteConfirm}
        close={() => closeConfirmDeleteModal(setDeleteConfirm)}
        del={() => deleteFile(162, setDeleteSuccess)}
      >
        <main>
          <div>영구 삭제 하시겠습니까?</div>
        </main>
      </ConfirmModal>
      <SucessModal
        open={deleteSuccess}
        close={() =>
          closeSuccessDeleteModal(setDeleteConfirm, setDeleteSuccess)
        }
      >
        <main>
          <div>영구 삭제 완료</div>
        </main>
      </SucessModal>
    </div>
  );
}

export default TrashCan;
