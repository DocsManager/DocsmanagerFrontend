import React from "react";
import DmTable from "./DmTable";

function MyBox() {
  return (
    <div style={{ display: "grid", gridTemplateRows: "0.3fr  3fr" }}>
      <h2 style={{ textAlign: "left", padding: "15px" }}>내 문서함</h2>
      <DmTable />
    </div>
  );
}

export default MyBox;
