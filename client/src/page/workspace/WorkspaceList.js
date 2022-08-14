import React, { useEffect, useState } from "react";
import {
  deleteUserWorkspace,
  getUserWorkspace,
} from "../../api/workspaceUserApi";
import { getUser } from "../../component/getUser/getUser";

function WorkspaceList() {
  const [workspaces, setWorkspace] = useState([]);
  const user = getUser();
  useEffect(() => {
    getUserWorkspace(user.userNo, setWorkspace);
  }, []);

  // console.log(JSON.parse(window.localStorage.getItem("event")));
  return (
    <div>
      {workspaces.map((workspace) => (
        <div className="workspaceList" key={workspace.workspaceNo.workspaceNo}>
          <span>{workspace.workspaceNo.title}</span>
          <span>{workspace.workspaceNo.master.name}</span>
          <a href={`/main/document?room=${workspace.workspaceNo.workspaceNo}`}>
            <button>입장</button>
          </a>
          <button
            onClick={() =>
              deleteUserWorkspace(1, workspace.workspaceNo.workspaceNo)
            }
          >
            나가기
          </button>
        </div>
      ))}
    </div>
  );
}

export default WorkspaceList;
