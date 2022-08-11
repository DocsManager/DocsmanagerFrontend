import React from "react";
import DmTable from "./DmTable";

function Important() {
  return (
    <div style={{ display: "grid", gridTemplateRows: "0.3fr 3fr" }}>
      <h2 style={{ textAlign: "left", padding: "15px" }}>중요 문서함</h2>
      <DmTable documentUrl="important/" />
    </div>
  );
}
export default Important;
