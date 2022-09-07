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
    <div style={{ display: "grid", gridTemplateRows: "0.2fr  3fr" }}>
      <h2
        style={{
          textAlign: "left",
          padding: "15px",
          borderBottom: "1px solid #d9d9d9",
          paddingLeft: "30px",
        }}
      >
        워크스페이스
      </h2>
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
