import ReactQuill, { Quill } from "react-quill";
import React, { useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
Quill.register("modules/ImageResize", ImageResize);

const QuillEditor = ({ props }) => {
  const test = useRef();
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

  return (
    <div style={{ height: "650px" }}>
      <ReactQuill
        id="reactQuill"
        style={{ height: "95vh" }}
        modules={modules}
        placeholder="내용을 입력해주세요."
        ref={test}
        onChange={(e) => {
          props.onEditorStateChange(e);
        }}
        preserveWhitespace={true}
        value={props.state.text}
      />
    </div>
  );
};
export default QuillEditor;
