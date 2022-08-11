import ReactQuill, { Quill } from "react-quill";
import React, { useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import { getWorkspace, updateWorkspace } from "../../api/workspaceApi";
import { onHtmlPng } from "./pdfSave";
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

const QuillEditor = ({ onEditorStateChange, message, setMessage }) => {
  const editor = useRef();
  const URLSearch = new URLSearchParams(window.location.search);
  const workspaceNo = URLSearch.get("room");
  return (
    <div style={{ height: "650px" }}>
      <button
        onClick={() => {
          const workspace = { content: editor.current.value };
          updateWorkspace(workspace, workspaceNo);
        }}
      >
        임시 저장
      </button>
      <button onClick={() => onHtmlPng()}>저장</button>
      <ReactQuill
        id="reactQuill"
        style={{ height: "75vh" }}
        modules={modules}
        placeholder="내용을 입력해주세요."
        ref={editor}
        onChange={(e) => {
          // console.log(e);
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
