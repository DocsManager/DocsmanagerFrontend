import axios from "axios";
import { notipublish, worksapcepublish } from "./noticeApi";

const baseUrl = "/api/workspace";

// 임시저장
export function updateWorkspace(content, workspace) {
  const url = `${baseUrl}/temp`;
  const fd = new FormData();
  var blob = new Blob([content], { type: "text/plain", endings: "native" });
  fd.append("file", blob, `workspace${workspace.workspaceNo}.txt`);
  fd.append(
    "workspace",
    new Blob([JSON.stringify(workspace)], { type: "application/json" })
  );
  axios
    .put(url, fd, {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    })
    .then(alert("임시 저장 완료"))
    .catch((err) => console.log(err));
}

// 제목 변경
export function updateTitleWorkspace(
  workspaceNo,
  originalName,
  workspace,
  check,
  setCheck,
  user
) {
  const url = `${baseUrl}/${workspaceNo}`;
  axios.get(`/api/workspace/member/${workspaceNo}`).then((res) => {
    const memberList = [];
    res.data.map(
      (v) => user.userNo !== v.userNo.userNo && memberList.push(v.userNo)
    );
    axios
      .put(url, workspace)
      .then(() => {
        const content = `${
          user.name
        }님께서 워크스페이스 이름을 ${originalName}에서 ${
          workspace.title
        }으로 변경하셨습니다. `;
        notipublish(memberList, user, content, "update");
        setCheck(!check);
      })
      .catch((err) => console.log(err));
  });
}

export function deleteWorkspace(workspaceNo, setCheck, check, user, title) {
  const url = `${baseUrl}/${workspaceNo}`;
  axios.get(`/api/workspace/member/${workspaceNo}`).then((res) => {
    const memberList = [];
    res.data.map(
      (v) => user.userNo !== v.userNo.userNo && memberList.push(v.userNo)
    );
    console.log(memberList);
    axios.delete(url).then(() => {
      const content = `${
        user.name
      }님께서 개설한 ${title} 이/가 삭제되었습니다.`;
      setCheck(!check);
      notipublish(memberList, user, content, "delete");
    });
  });
}

export function addWorkspace(
  workspace,
  searchList,
  closeHandler,
  user,
  setCheck,
  check
) {
  axios
    .post(baseUrl, workspace)
    .then((res) => {
      // setNewWorkspace(res.data.at(-1)); //workspace 받아오기 위한 용도
      worksapcepublish(
        searchList,
        res.data.at(-1).workspaceNo.workspaceNo,
        user
      );
      closeHandler();
      setCheck(!check);
    })
    .catch((err) => console.log(err));
}

export function getWorkspace(workspaceNo, setWorkspace) {
  const url = `${baseUrl}/${workspaceNo}`;
  axios
    .get(url)
    .then(async (res) => {
      await setWorkspace(res.data);
    })
    .catch((err) => console.log(err));
}

export function getTempContent(fileNo, setMessage) {
  const url = `/api/temp/${fileNo}`;
  axios
    .get(url)
    .then((res) => {
      res.data && getTempText(res.data.filePath, setMessage);
    })
    .catch((err) => console.log(err));
}

export function getTempText(url, setMessage) {
  axios.get(url).then((res) => setMessage(res.data));
}
