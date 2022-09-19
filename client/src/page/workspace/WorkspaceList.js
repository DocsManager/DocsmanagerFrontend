import React, { useContext, useEffect, useState } from "react";
import { getUserWorkspace } from "../../api/workspaceUserApi";
import WorkspaceTable from "./WorkspaceTable";
import { MyContext } from "../Main";

function WorkspaceList() {
  const [workspaces, setWorkspace] = useState([]);
  const { check, userInfo } = useContext(MyContext);
  useEffect(() => {
    getUserWorkspace(userInfo.userNo, setWorkspace);
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
        user={userInfo}
      />
    </div>
  );
}

export default WorkspaceList;
