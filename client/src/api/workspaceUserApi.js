import axios from "axios";
import { notipublish } from "./noticeApi";

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
  check,
  user
) {
  const url = baseUrl + `all/${userNo}`;
  console.log(workspaceNoList);
  axios
    .post(url, workspaceNoList)
    .then(() => {
      setCheck(!check);
      workspaceNoList.map((workspace) => {
        if (workspace.master.userNo === user.userNo) {
          const content = `${user.name}님께서 개설한 ${
            workspace.title
          } 이/가 삭제되었습니다.`;
          const memberList = [];
          workspace.member.map(
            (member) =>
              parseInt(member.split(",")[0]) !== workspace.master.userNo &&
              memberList.push({
                userNo: parseInt(member.split(",")[0]),
                dept: { deptNo: parseInt(member.split(",")[2]) },
                id: member.split(",")[3],
              })
          );
          notipublish(memberList, user, content, "delete");
        }
        return workspace;
      });
    })
    .catch((err) => console.log(err));
}

export function addWorkspaceUser(row, userList, check, setCheck) {
  const url = baseUrl + row.workspaceNo;
  axios
    .post(url, userList)
    .then((res) => setCheck(!check))
    .catch((err) => console.log(err));
}

//멤버 검색
export function workspaceMember(workspaceNo, setMemberList, userNo) {
  const url = `/api/workspace/member/${workspaceNo}`;
  axios
    .get(url)
    .then((res) => {
      const memberList = [];
      res.data.map(
        (v) => userNo !== v.userNo.userNo && memberList.push(v.userNo)
      );
      setMemberList(memberList);
    })
    .catch((err) => console.log(err));
}
