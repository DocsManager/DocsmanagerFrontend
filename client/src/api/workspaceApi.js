import axios from "axios";

const baseUrl = "/api/workspace";

export function updateWorkspace(content, workspaceNo) {
  const url = `${baseUrl}/temp/${workspaceNo}`;
  const fd = new FormData();
  var blob = new Blob([content], { type: "text/plain", endings: "native" });
  fd.append("file", blob, `workspace${workspaceNo}.txt`);
  axios
    .put(url, fd, {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    })
    .catch((err) => console.log(err));

  // axios.put(url, workspace).catch((err) => console.log(err));
}

export function deleteWorkspace() {}

export function addWorkspace() {}

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
