import React from "react";
import DmTable from "./DmTable";

function ShareBox() {
  return (
    <div style={{ display: "grid", gridTemplateRows: "0.3fr  3fr" }}>
      <h2 style={{ textAlign: "left", padding: "15px" }}>공유 문서함</h2>
      <DmTable documentUrl="share/" />
    </div>
  );
}

export default ShareBox;
