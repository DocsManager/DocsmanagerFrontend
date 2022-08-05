import React, { useEffect, useState } from "react";
import {
  deleteUserWorkspace,
  getUserWorkspace,
} from "../../api/workspaceUserApi";

function WorkspaceList() {
  const [workspaces, setWorkspace] = useState([]);
  useEffect(() => {
    getUserWorkspace(1, setWorkspace);
  }, []);

  console.log(workspaces);
  return (
    <div>
      {workspaces.map((workspace) => (
        <div className="workspaceList" key={workspace.workspaceNo.workspaceNo}>
          <span>{workspace.workspaceNo.title}</span>
          <span>{workspace.workspaceNo.master.name}</span>
          <a
            href={`/main/document/${workspace.workspaceNo.workspaceNo}?room=${
              workspace.workspaceNo.workspaceNo
            }`}
          >
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
