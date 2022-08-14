import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { pdfSend } from "../../api/testApi";

export const onHtmlPng = () => {
  const onCapture = () => {
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
  onCapture();
};
