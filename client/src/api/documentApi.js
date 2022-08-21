import axios from "axios";
import { getUser } from "../component/getUser/getUser";

const baseUrl = "/api/";
const documentBaseUrl = baseUrl + "documents/user/";

// 페이지별 리스트 출력
export function getList(setList, documentUrl) {
  const url = documentBaseUrl + documentUrl + getUser().userNo;
  axios.get(url).then((res) => {
    res.data.dtoList.map((data, index) => {
      data.id = index + 1;
      data.userName = data.userNo.name;
    });
    console.log(res.data);
    setList(res.data.dtoList);
  });
}

// 휴지통 보내기
export function updateRecycleBinFile(
  documentNo,
  setConfirmModalOpen,
  setSuccessModalOpen
) {
  const url = baseUrl + "documents/" + getUser().userNo;
  let arr = [];
  documentNo.map((v) =>
    arr.push({ documentNo: { documentNo: v }, recycleBin: 1 })
  );
  axios
    .put(url, arr)
    .then(setConfirmModalOpen(false))
    .then(setSuccessModalOpen(true))
    .catch((err) => console.log(err));
}

// 영구 삭제
export function deleteFile(
  newSelected,
  setConfirmModalOpen,
  setSuccessModalOpen
) {
  const url = baseUrl + "document/" + getUser().userNo;
  console.log(newSelected);
  axios
    .delete(url, {
      headers: {
        "Content-Type": `application/json`,
      },
      data: newSelected,
    })
    .then(setConfirmModalOpen(false))
    .then(setSuccessModalOpen(true))
    .catch((err) => console.log(err));
}

// 파일 정보 모달
export function openInfoModal(setInfoModalOpen, documentNo, setDocument) {
  setInfoModalOpen(true);
  const url = baseUrl + "document/" + documentNo;
  axios.get(url).then((res) => {
    setDocument(res.data);
  });
}

// 파일 복원
export function restoreFile(documentNo, setSuccessModalOpen) {
  const url = baseUrl + "documents/" + getUser().userNo;
  let arr = [];
  documentNo.map((v) =>
    arr.push({ documentNo: { documentNo: v }, recycleBin: 0 })
  );
  console.log(documentNo);
  axios.put(url, arr).then(setSuccessModalOpen(true));
}

// 중요 표시
export function importantFile(documentNo) {
  const url = baseUrl + "documents/" + getUser().userNo;
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

//중요 표시 해제
export function removeImportantFile(documentNo) {
  const url = baseUrl + "documents/" + getUser().userNo;
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

// 문서 작성

export function writeFile(file, documentDTO, documentUser, fileName) {
  const url = "/api/document";

  const fd = new FormData();

  fileName
    ? fd.append("file", file, `${fileName}.pdf`)
    : fd.append("file", file);

  fd.append(
    "documentUser",
    new Blob([JSON.stringify(documentUser)], { type: "application/json" })
  );
  fd.append(
    "documentDTO",
    new Blob([JSON.stringify(documentDTO)], { type: "application/json" })
  );

  axios
    .post(url, fd, {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    })
    .then((res) => {
      console.log(res.data);
    });
}

// content 수정
export function updateContent(documentNo, text) {
  const url = baseUrl + "document/" + documentNo;
  axios
    .put(url, {
      content: text,
    })
    .then((res) => console.log(res.data));
}

// File 수정
export function updateFile(documentNo, file) {
  const url = baseUrl + "document/" + documentNo;

  const fd = new FormData();
  fd.append("file", file);
  axios
    .post(url, fd, {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    })
    .then((res) => {
      console.log(res.data);
    });
}

// user 추가
export function documentAddUser(userList) {
  const url = baseUrl + "document/authority";

  axios.post(url, userList).then((res) => {
    console.log(res.data);
  });
}
