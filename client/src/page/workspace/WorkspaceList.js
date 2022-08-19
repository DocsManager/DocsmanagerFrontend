import React, { useEffect, useState } from "react";
import {
  deleteUserWorkspace,
  getUserWorkspace,
} from "../../api/workspaceUserApi";
import { getUser } from "../../component/getUser/getUser";
import WorkspaceTable from "./WorkspaceTable";

function WorkspaceList() {
  const [workspaces, setWorkspace] = useState([]);
  const user = getUser();
  useEffect(() => {
    getUserWorkspace(user.userNo, setWorkspace);
  }, []);

  return (
    <div>
      <WorkspaceTable
        workspace={workspaces}
        setWorkspace={setWorkspace}
        user={user}
      />
    </div>
  );
}

export default WorkspaceList;
