import { Button, Typography } from "@mui/material";
import React from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toast.css";
import { Link } from "react-router-dom";

export const notify = (newNotice) =>
  toast(
    newNotice && (
      <div style={{ height: "100%" }}>
        <Typography style={{ fontWeight: "bold" }}>
          {newNotice.content}
        </Typography>
        {newNotice.urlParams ? (
          <Link
            to={newNotice.urlParams}
            style={{ marginLeft: "80%", marginTop: "40px" }}
          >
            <Button sx={{ fontSize: "1.1rem" }} variant="contained">
              이동하기
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    ),
    {
      autoClose: 4000,
      position: "bottom-right",
      hideProgressBar: true,
      className: "toast-message",
      limit: 5,
    }
  );

export default function Toastify({ newNotice }) {
  return (
    <div>
      <ToastContainer draggablePercent={60} transition={Zoom} />
    </div>
  );
}
