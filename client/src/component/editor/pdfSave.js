import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { pdfSend } from "../../api/testApi";

// export function imageToPdf() {
//   const capture = document.getElementById("capture");
//   html2canvas(capture).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "pt", "a4");

//     pdf.addImage(imgData, "JPEG", 0, 0);
//     pdf.save("download.pdf");
//   });
// }

// export function htmlToPdf() {
//   window.html2canvas = html2canvas;
//   let pdf = new jsPDF("p", "pt", "a4");
//   pdf.html(document.getElementById("divToPrint"), {
//     callback: function() {
//       pdf.save("myDocument.pdf");
//       window.open(pdf.output("bloburl"));
//     },
//   });

//   html2canvas(capture).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "pt", "a4");

//     pdf.addImage(imgData, "JPEG", 0, 0);
//     pdf.save("download.pdf");
//   });
// }

export const onHtmlPng = () => {
  const onCapture = () => {
    console.log("onCapture");
    html2canvas(document.querySelector(".ql-editor")).then((canvas) => {
      // onSaveAs(canvas.toDataURL("image/png"), "image-download.png");
      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "pt", "a4");

      pdf.addImage(imageData, "JPEG", 0, 0);
      var blobPDF = new Blob([pdf.output("blob")], { type: "application/pdf" });
      pdfSend(blobPDF);
      // pdf.save("download.pdf");
    });
  };
  const onSaveAs = (uri, filename) => {
    console.log("onSaveAs");
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };
  onCapture();

  console.log(document.querySelector(".ql-editor"));
};
