import ReactQuill, { Quill } from "react-quill";
import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import { updateWorkspace } from "../../api/workspaceApi";
import { onHtmlPng } from "../../component/editor/pdfSave";
import { Box, Button, ThemeProvider } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import {
  BackspaceOutlined,
  Save,
  SaveAlt,
  SaveAltOutlined,
  SaveAs,
} from "@mui/icons-material";
import SaveWorksapce from "../modal/SaveWorksapce";
import { Link } from "react-router-dom";
import { theme } from "../../Config";
import { getUser } from "../../component/getUser/getUser";
Quill.register("modules/ImageResize", ImageResize);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }],
    ["clean"],
  ],
  ImageResize: {
    parchment: Quill.import("parchment"),
  },
};

const QuillEditor = ({
  onEditorStateChange,
  message,
  setMessage,
  workspace,
}) => {
  const [open, setOpen] = useState(false);
  const editor = useRef();
  const user = getUser();

  return (
    // 임시저장, 저장, 워크스페이스 목록으로 이동 버튼 전반적인 css 수정
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
        <Box>
          {workspace.master && workspace.master.userNo === user.userNo ? (
            <>
              <Button
                startIcon={<SaveAs />}
                sx={{ fontSize: "1.2rem", color: "#3791f8" }}
                onClick={() => {
                  updateWorkspace(message, workspace);
                }}
              >
                임시 저장
              </Button>
              <Button
                startIcon={<Save />}
                sx={{ fontSize: "1.2rem", color: "#3791f8" }}
                onClick={() => setOpen(true)}
              >
                저장
              </Button>
            </>
          ) : (
            <><Button
            startIcon={<SaveAs />}
            sx={{ fontSize: "1.2rem", color: "#3791f8" }}
            onClick={() => {
              updateWorkspace(message, workspace);
            }}
            disabled
          >
            임시 저장
          </Button>
          <Button
            startIcon={<Save />}
            sx={{ fontSize: "1.2rem", color: "#3791f8" }}
            onClick={() => setOpen(true)}
            disabled
          >
            저장
          </Button></>
            
          )}
        </Box>
        <a href="/main/workspace" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            endIcon={<ArrowBackOutlinedIcon />}
            sx={{ fontSize: "1rem" }}
          >
            워크스페이스 목록으로 이동
          </Button>
        </a>
      </Box>

      <ReactQuill
        id="reactQuill"
        style={{ height: "75vh" }}
        modules={modules}
        placeholder="내용을 입력해주세요."
        ref={editor}
        onChange={(e) => {
          console.log(e);
          if (document.activeElement === document.querySelector(".ql-editor")) {
            onEditorStateChange(e);
            setMessage(e);
          }
        }}
        preserveWhitespace={true}
        value={message}
      />
      <SaveWorksapce open={open} setOpen={setOpen} />
    </div>
  );
};
export default QuillEditor;
