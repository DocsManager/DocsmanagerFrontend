import axios from "axios";

const baseUrl = "/api/";

export function getList(setList, page) {
  const url = baseUrl + "documents/user/1?page=" + page;
  axios.get(url).then((res) => {
    setList(res.data);
    console.log(res.data);
  });
}

export function updateRecycleBinFile(documentNo, setModalOpen2, setModalOpen3) {
  const url = baseUrl + "documents/1";
  axios
    .put(url, [
      {
        documentNo: {
          documentNo: documentNo,
        },
        recycleBin: 1,
      },
    ])
    .then(setModalOpen2(false));
  setModalOpen3(true);
}

export function deleteFile(documentNo, setDeleteSuccess) {
  const url = baseUrl + "documents";
  axios.delete(url, documentNo).then(setDeleteSuccess(true));
}

export function openInfoModal(setInfoModalOpen, documentNo, setDocument) {
  setInfoModalOpen(true);
  const url = baseUrl + "document/" + documentNo;
  axios.get(url).then((res) => setDocument(res.data));
}

export function getRecycleBinList(setList, page) {
  const url = baseUrl + "documents/user/recycle/1?page=" + page;
  axios.get(url).then((res) => {
    setList(res.data);
    console.log(res.data);
  });
}

export function restoreFile(setRestoreConfirm, setRestoreSuccess, documentNo) {
  const url = baseUrl + "documents/1";
  axios
    .put(url, [
      {
        documentNo: {
          documentNo: documentNo,
        },
        recycleBin: 0,
      },
    ])
    .then(setRestoreConfirm(false));
  setRestoreSuccess(true);
}

export function getImportantList(setList, page) {
  const url = baseUrl + "documents/user/important/1?page=" + page;
  axios.get(url).then((res) => {
    setList(res.data);
    console.log(res.data);
  });
}

export function importantFile(documentNo) {
  const url = baseUrl + "documents/1";
  axios
    .put(url, [
      {
        documentNo: {
          documentNo: documentNo,
        },
        important: 1,
      },
    ])
    .then((res) => console.log(res.data));
}
export function removeImportantFile(documentNo) {
  const url = baseUrl + "documents/1";
  axios
    .put(url, [
      {
        documentNo: {
          documentNo: documentNo,
        },
        important: 0,
      },
    ])
    .then((res) => console.log(res.data));
}
