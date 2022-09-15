import axios from "axios";
import { getUser } from "../component/getUser/getUser";

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

export function deleteAllWorkspaceUser(
  userNo,
  workspaceNoList,
  setCheck,
  check
) {
  const url = baseUrl + `all/${userNo}`;
  axios
    .post(url, workspaceNoList)
    .then(() => setCheck(!check))
    .catch((err) => console.log(err));
}

export function addWorkspaceUser(row, userList, check, setCheck) {
  const url = baseUrl + row.workspaceNo;
  console.log(userList);
  axios
    .post(url, userList)
    .then((res) => setCheck(!check))
    .catch((err) => console.log(err));
}

//멤버 검색
export function workspaceMember(workspaceNo, setMemberList) {
  const url = `/api/workspace/member/${workspaceNo}`;
  const user = getUser();
  axios
    .get(url)
    .then((res) => {
      // const workspaceList = res.data.filter(
      //   (v) => v.workspaceNo.master.userNo !== v.userNo.userNo
      // );
      const memberList = [];
      res.data.map((v) => memberList.push(v.userNo));
      setMemberList(memberList);
    })
    .catch((err) => console.log(err));
}
