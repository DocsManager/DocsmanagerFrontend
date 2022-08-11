import axios from "axios";

const baseUrl = "/api/workspace";

export function updateWorkspace(workspace, workspaceNo) {
  const url = `${baseUrl}/${workspaceNo}`;
  axios.put(url, workspace).catch((err) => console.log(err));
}

export function deleteWorkspace() {}

export function addWorkspace() {}

export function getWorkspace(workspaceNo, setText) {
  const url = `${baseUrl}/${workspaceNo}`;
  axios
    .get(url)
    .then((res) => {
      // setText(res.data.content);
      // stateToChange.text = res.data.content;
    })
    .catch((err) => console.log(err));
}
