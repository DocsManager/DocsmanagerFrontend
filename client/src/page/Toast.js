import { Box } from "@mui/material";
import React from "react";
import { FaIcons } from "react-icons/fa";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toast.css";

const icon = (newNotice) => {
  if (JSON.stringify(newNotice).includes("문서")) {
    return <FaIcons.FileUser />;
  }
  return <FaIcons.FaLaptop />;
};

export const notify = (newNotice) =>
  toast(JSON.stringify(newNotice).replaceAll('"', ""), {
    autoClose: 4000,
    position: "bottom-right",
    hideProgressBar: true,
    className: "toast-message",
  });

export default function Toastify({ newNotice }) {
  return (
    <div>
      <ToastContainer draggablePercent={60} transition={Zoom} />
    </div>
  );
}
