import React from "react";
// import axios from "axios";
// import { Button, styled } from "@mui/material";
import DmTable from "./DmTable";

// const columns = [
//   {
//     field: "originalName",
//     headerName: "제목",
//     width: 400,
//     headerAlign: "center",
//   },

//   {
//     field: "userName",

//     headerName: "작성자",
//     width: 100,
//     headerAlign: "center",
//   },
//   {
//     field: "registerDate",
//     headerName: "등록일",
//     type: "date",
//     width: 200,
//     headerAlign: "center",
//   },
//   {
//     field: "modifyDate",
//     headerName: "수정일",
//     type: "date",
//     width: 200,
//     headerAlign: "center",
//   },
// ];
// const EnrollBtn = styled(Button)({
//   backgroundColor: "#3791f8",
//   marginLeft: "10px",
// });

export default function Table() {
  return (
    <div style={{ display: "grid", gridTemplateRows: "0.3fr 3fr" }}>
      <h2 style={{ textAlign: "left", padding: "15px" }}>휴지통</h2>
      <DmTable documentUrl="recycle/" />
    </div>
  );
}
