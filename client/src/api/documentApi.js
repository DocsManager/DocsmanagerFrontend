import axios from "axios";
import { getUser } from "../component/getUser/getUser";

const baseUrl = "/api/";
const documentBaseUrl = baseUrl + "documents/user/";

// 페이지별 리스트 출력
export function getList(setList, pages, documentUrl) {
  const url =
    documentBaseUrl + documentUrl + getUser().userNo + "?page=" + pages;
  axios.get(url).then((res) => {
    res.data.dtoList.map((data, index) => {
      data.id = index + 1;
      data.userName = data.userNo.name;
    });
    console.log(pages);
    console.log(res.data);
    setList(res.data);
    // console.log(res.data.dtoList);
    // setPageList(res.data);
  });
}

// 휴지통 보내기
export function updateRecycleBinFile(documentNo) {
  const url = baseUrl + "documents/" + getUser().userNo;
  let arr = [];
  console.log(documentNo);
  documentNo.map((v) =>
    arr.push({
      documentNo: { documentNo: v.documentNo.documentNo },
      recycleBin: 1,
    })
  );
  axios.put(url, arr).catch((err) => console.log(err));
}

// 영구 삭제
export function deleteFile(newSelected) {
  const url = baseUrl + "document/" + getUser().userNo;
  console.log(newSelected);
  axios
    .delete(url, {
      headers: {
        "Content-Type": `application/json`,
      },
      data: newSelected,
    })
    .catch((err) => console.log(err));
}

// 마스터 영구 삭제
export function masterDeleteFile(newSelected) {
  const url = baseUrl + "documents/";
  console.log(newSelected);
  axios
    .delete(url, {
      headers: {
        "Content-Type": `application/json`,
      },
      data: newSelected,
    })
    .catch((err) => console.log(err));
}

// 파일 복원
export function restoreFile(documentNo) {
  const url = baseUrl + "documents/" + getUser().userNo;
  let arr = [];
  documentNo.map((v) =>
    arr.push({
      documentNo: { documentNo: v.documentNo.documentNo },
      recycleBin: 0,
    })
  );
  console.log(documentNo);
  axios.put(url, arr);
}

// 중요 표시
export function importantFile(documentNo, important) {
  const url = baseUrl + "documents/" + getUser().userNo;
  axios
    .put(url, [
      {
        documentNo: {
          documentNo: documentNo,
        },

        important: important,
      },
    ])
    .catch((err) => console.log(err));
}

// 문서 작성

export function writeFile(
  file,
  documentDTO,
  documentUser,
  sizeCheck,
  fileName
) {
  const url = "/api/document";

  const fd = new FormData();

  fileName
    ? fd.append("file", file, `${fileName}.pdf`)
    : fd.append("file", file);
  console.log(documentUser);
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
      sizeCheck(res.data);
      console.log(res.data);
    });
}

// content 변경
export function updateContent(documentNo, text) {
  const url = baseUrl + "document/" + documentNo;
  axios
    .put(url, {
      content: text,
    })
    .then((res) => console.log(res.data));
}

// File 변경
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
export function documentAddUser(userList, row) {
  const url = baseUrl + "document/authority";
  const documentUser = userList.map(
    (search) =>
      (search = {
        authority: search.authority,
        userNo: search,
        documentNo: row,
      })
  );
  console.log(documentUser);
  axios.post(url, documentUser).then((res) => {
    console.log(res.data);
  });
}

// 멤버 검색
export function documentMember(documentNo, setMemberList) {
  const url = `${baseUrl}document/member/${documentNo}`;
  axios
    .get(url)
    .then((res) => {
      const documentList = res.data.filter((v) => v.authority !== "MASTER");
      const memberList = [];

      documentList.map((v) => {
        v.userNo.authority = v.authority;
        memberList.push(v.userNo);
      });
      setMemberList(memberList);
    })
    .catch((err) => console.log(err));
}

// 파일 검색
export function searchDocument(userNo, originalName, documentUrl, setList) {
  const url = `${baseUrl}document/${documentUrl}/${userNo}/${originalName}`;
  console.log(originalName);
  axios
    .get(url)
    .then((res) => {
      setList(res.data);
    })
    .catch((err) => console.log(err));
}

// 내 문서 용량
export function fileSize(userNo, setSize) {
  const url = `${baseUrl}documents/size/${userNo}`;
  axios
    .get(url)
    .then((res) => {
      setSize(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

export function fileDownload(url, originalName) {
  fetch(url, { method: "GET" })
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = originalName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 60000);
      a.remove();
    })
    .catch((err) => console.log("err :", err));
  // axios({ url: url, method: "GET", responseType: "blob" });
}
