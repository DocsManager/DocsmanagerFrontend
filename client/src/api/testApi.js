import axios from "axios";

export function pdfSend(pdf) {
  const url = "/api/document";
  const documentDTO = {
    user: {
      userNo: 6,
      dept: {
        deptNo: 1,
      },
    },
    content: "test66",
    userList: [{ userNo: 7, dept: { deptNo: 10 } }],
  };
  const fd = new FormData();
  fd.append("file", pdf, "test.pdf");
  fd.append(
    "documentDTO",
    new Blob([JSON.stringify(documentDTO)], { type: "application/json" })
  );

  axios
    .post(url, fd, {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    })
    .then((res) => {
      console.log(res.data);
    });
}
