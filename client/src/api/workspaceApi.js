import axios from "axios";

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
  const url = baseUrl + `/${workspaceNo}`;
  axios
    .put(url, workspace)
    .then((res) => setList(res.data))
    .catch((err) => console.log(err));
}

export function deleteWorkspace() {}

export function addWorkspace(workspace, setOpen) {
  axios
    .post(baseUrl, workspace)
    .then((res) => setOpen(false))
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
      console.log(res.data);
      res.data && getTempText(res.data.filePath, setMessage);
    })
    .catch((err) => console.log(err));
}

export function getTempText(url, setMessage) {
  // console.log(url);
  // fetch(url)
  //   .then((res) => res.text())
  //   .then((text) => {
  //     console.log(text);
  //     setMessage(text);
  //   });
  console.log(url);
  axios.get(url).then((res) => setMessage(res.data));
}
