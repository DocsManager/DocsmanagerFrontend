import axios from "axios";
import { notipublish } from "./noticeApi";

const baseUrl = "/api/";
const documentBaseUrl = baseUrl + "documents/user/";

// 페이지별 리스트 출력
export function getList(setList, pages, documentUrl, user) {
  const url = documentBaseUrl + documentUrl + user.userNo + "?page=" + pages;
  axios.get(url).then((res) => {
    res.data.dtoList.map((data, index) => {
      data.id = index + 1;
      data.userName = data.userNo.name;
      return data;
    });
    setList(res.data);
  });
}

// 휴지통 보내기
export function updateRecycleBinFile(documentNo, user) {
  const url = baseUrl + "documents/" + user.userNo;
  let arr = [];
  documentNo.map((v) =>
    arr.push({
      documentNo: { documentNo: v.documentNo.documentNo },
      recycleBin: 1,
    })
  );
  axios.put(url, arr).catch((err) => console.log(err));
}

// 영구 삭제
export function deleteFile(newSelected, user) {
  const url = baseUrl + "document/" + user.userNo;
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
export function masterDeleteFile(newSelected, userInfo, content) {
  const memberUrl = `${baseUrl}document/member/${newSelected}`;
  const url = baseUrl + `documents/${newSelected}`;
  axios.get(memberUrl).then((res) =>
    axios.delete(url).then(() => {
      console.log(res.data.filter((v) => v.authority !== "MASTER"));
      notipublish(
        res.data.map((v) => {
          if (v.authority !== "MASTER") {
            return v.userNo;
          }
          return null;
        }),
        userInfo,
        content,
        "delete"
      );
    })
  );
  // axios
  //   .delete(url)
  //   .then((res) => console.log(res.data))
  //   .catch((err) => console.log(err));
}

// 파일 복원
export function restoreFile(documentNo, user) {
  const url = baseUrl + "documents/" + user.userNo;
  let arr = [];
  documentNo.map((v) =>
    arr.push({
      documentNo: { documentNo: v.documentNo.documentNo },
      recycleBin: 0,
    })
  );
  axios.put(url, arr);
}

// 중요 표시
export function importantFile(documentNo, important, user) {
  const url = baseUrl + "documents/" + user.userNo;
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
    });
}

// content 변경
export function updateContent(documentNo, text, member, user, content) {
  const url = baseUrl + "document/" + documentNo;
  axios
    .put(url, {
      content: text,
    })
    .then(() => notipublish(member, user, content));
}

// File 변경
export function updateFile(documentNo, file) {
  const url = baseUrl + "document/" + documentNo;

  const fd = new FormData();
  fd.append("file", file);
  axios.post(url, fd, {
    headers: {
      "Content-Type": "multipart/form-data;",
    },
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
  axios.post(url, documentUser).catch((err) => console.log(err));
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
        return v;
      });
      setMemberList(memberList);
    })
    .catch((err) => console.log(err));
}

// 파일 검색
export function searchDocument(
  userNo,
  originalName,
  documentUrl,
  setList,
  page,
  type
) {
  // const url = `${baseUrl}document/${documentUrl}${userNo}/${originalName}?page=${page}`;
  const url =
    baseUrl +
    "document/" +
    documentUrl +
    type +
    "/" +
    userNo +
    "/" +
    originalName +
    "?page=" +
    page;
  axios
    .get(url)
    .then((res) => {
      res.data.dtoList.map((data, index) => {
        data.id = index + 1;
        data.userName = data.userNo.name;
        return data;
      });
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
