import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { writeFile } from "../../api/documentApi";

export const onHtmlPng = (title, newDocument) => {
  const onCapture = () => {
    html2canvas(document.querySelector(".ql-editor")).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "pt", "a4");

      pdf.addImage(imageData, "JPEG", 0, 0);
      var blobPDF = new Blob([pdf.output("blob")], { type: "application/pdf" });
      // pdfSend(blobPDF);
      writeFile(blobPDF, newDocument, title);
    });
  };
  onCapture();
};
