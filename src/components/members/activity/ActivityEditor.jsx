import React, { useState, useEffect, lazy, Suspense } from "react";
import "quill/dist/quill.snow.css"; // CSS 임포트 (툴바 표시용)
import Quill from "quill";
import "../../../styles/Activity/ActivityEditor.css";


// Quill을 전역에서 인식하도록 설정
if (typeof window !== "undefined") {
  window.Quill = Quill;
}

const ReactQuill = lazy(() => import("react-quill"));

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "script",
  "indent",
  "direction",
  "size",
  "color",
  "background",
  "font",
  "align",
  "link",
  "image",
  "video",
];

const ActivityEditor = ({ activity, onSave, onCancel }) => {
  const [content, setContent] = useState(activity ? activity.content : "");

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-quill").then((module) => {
        console.log("ReactQuill loaded:", module.default);
      });
    }
  }, []);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    onSave({ ...activity, content });
  };

  return (
    <div className="editor-container">
      <h2>{activity ? "활동 수정" : "새 활동 추가"}</h2>
      <Suspense fallback={<p>Loading Editor...</p>}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder="내용을 입력하세요..."
        />
      </Suspense>
      <div className="editor-buttons">
        <button onClick={handleSave} className="left-button">저장</button>
        <button onClick={onCancel} className="right-button">취소</button>
      </div>
    </div>
  );
};

export default ActivityEditor;
