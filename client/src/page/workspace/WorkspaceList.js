import React, { useEffect, useState } from "react";
import {
  deleteUserWorkspace,
  getUserWorkspace,
} from "../../api/workspaceUserApi";
import { getUser } from "../../component/getUser/getUser";
import WorkspaceTable from "./WorkspaceTable";

function WorkspaceList() {
  const [workspaces, setWorkspace] = useState([]);
  const [check, setCheck] = useState(false);
  const user = getUser();
  useEffect(() => {
    getUserWorkspace(user.userNo, setWorkspace);
  }, [check]);

  return (
    <div>
      <WorkspaceTable
        workspace={workspaces}
        setWorkspace={setWorkspace}
        user={user}
        check={check}
        setCheck={setCheck}
      />
    </div>
  );
}

export default WorkspaceList;
