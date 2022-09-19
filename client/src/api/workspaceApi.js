import axios from "axios";
import { worksapcepublish } from "./noticeApi";

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
export function updateTitleWorkspace(workspaceNo, workspace, setList) {
  const url = `${baseUrl}/${workspaceNo}`;
  axios
    .put(url, workspace)
    .then((res) => {
      setList(res.data);
    })
    .catch((err) => console.log(err));
}

export function deleteWorkspace(workspaceNo, setCheck, check) {
  const url = `${baseUrl}/${workspaceNo}`;
  axios.delete(url).then(() => setCheck(!check));
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
