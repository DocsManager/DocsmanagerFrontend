import ReactQuill, { Quill } from "react-quill";
import React, { useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import { updateWorkspace } from "../../api/workspaceApi";
import { onHtmlPng } from "./pdfSave";
import { Button } from "@mui/material";
import { Save, SaveAlt, SaveAltOutlined, SaveAs } from "@mui/icons-material";
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
  const editor = useRef();
  return (
    <div style={{ height: "650px" }}>
      <Button
        startIcon={<SaveAs />}
        onClick={() => {
          updateWorkspace(message, workspace);
        }}
      >
        임시 저장
      </Button>
      <Button startIcon={<Save />} onClick={() => onHtmlPng()}>
        저장
      </Button>

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
    </div>
  );
};
export default QuillEditor;
