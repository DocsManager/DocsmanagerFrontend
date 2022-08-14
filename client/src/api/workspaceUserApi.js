import axios from "axios";

const baseUrl = "/api/workspace/user/";

export function getUserWorkspace(userNo, setWorkspace) {
  const url = baseUrl + userNo;
  axios
    .get(url)
    .then((res) => {
      console.log(res.data);
      setWorkspace(res.data);
    })
    .catch((err) => console.log(err));
}
export function deleteUserWorkspace(userNo, workspaceNo) {
  const url = `${baseUrl}${userNo}/${workspaceNo}`;
  axios.delete(url).catch((err) => console.log(err));
}
