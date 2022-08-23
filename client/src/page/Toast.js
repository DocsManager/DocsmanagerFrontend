import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toast.css";

export const notify = (newNotice) =>
  toast(JSON.stringify(newNotice).replaceAll('"', ""), {
    autoClose: 4000,
    position: "bottom-left",
    hideProgressBar: true,
    className: "toast-message",
  });

export default function Toastify() {
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
