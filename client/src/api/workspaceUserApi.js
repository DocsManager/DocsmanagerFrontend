import axios from "axios";

const baseUrl = "/api/workspace/user/";

export function getUserWorkspace(userNo, setWorkspace) {
  const url = baseUrl + userNo;
  axios
    .get(url)
    .then((res) => {
      setWorkspace(res.data);
    })
    .catch((err) => console.log(err));
}
export function deleteUserWorkspace(userNo, workspaceNo, setWorkspace) {
  const url = baseUrl + `${userNo}/${workspaceNo}`;
  axios
    .delete(url)
    .then((res) => setWorkspace(res.data))
    .catch((err) => console.log(err));
}

export function deleteAllWorkspaceUser(userNo, workspaceNoList, setWorkspace) {
  const url = baseUrl + `all/${userNo}`;
  axios
    .post(url, workspaceNoList)
    .then((res) => setWorkspace(res.data))
    .catch((err) => console.log(err));
}

export function addWorkspaceUser(workspaceNo, userList, check, setCheck) {
  const url = baseUrl + workspaceNo;
  console.log(userList);
  axios
    .post(url, userList)
    .then((res) => setCheck(!check))
    .catch((err) => console.log(err));
}
