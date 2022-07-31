import React from "react";
import { Link } from "react-router-dom";

function WorkspaceList() {
  return (
    <div>
      <Link to="document">
        <button>입장</button>
      </Link>
    </div>
  );
}

export default WorkspaceList;
