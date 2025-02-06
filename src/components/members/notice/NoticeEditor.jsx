import React, {useState, lazy, Suspense, useContext} from "react";
import Quill from "quill";
import "../../../styles/notice/NoticeEditor.css";
import "quill/dist/quill.snow.css";
import { NoticeContext } from "../../../contexts/NoticeContext";

if (typeof window !== "undefined") {
    window.Quill = Quill;
}

const ReactQuill = lazy(() => import("react-quill"));

const modules = {
    toolbar: [
        [{header: [1, 2, 3, false]}],
        ["bold", "italic", "underline", "strike"],
        [{list: "ordered"}, {list: "bullet"}],
        [{script: "sup"}, {script: "sub"}],
        [{indent: "-1"}, {indent: "+1"}],
        [{direction: "rtl"}],
        [{size: ["small", false, "large", "huge"]}],
        [{color: []}, {background: []}],
        [{font: []}],
        [{align: []}],
        ["link", "image", "video"],
        ["clean"],
    ],
};

const formats = [
    "headers",
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

function NoticeEditor() {
    const {
        notices,
        setNotices,
        isAdmin,
        editingNotice,
        setEditingNotice,
        setIsEditing,
    } = useContext(NoticeContext);
    const [title, setTitle] = useState(editingNotice ? editingNotice.title : "");
    const [content, setContent] = useState(editingNotice ? editingNotice.content : "");

    // 저장 버튼 핸들러
    const handleSave = () => {
        const now = new Date().toLocaleString();
        if (editingNotice) {
            // 기존 공지 수정
            const updatedNotice = {
                ...editingNotice,
                title,
                content,
                updateDate: now,
            };
            setNotices((prev) =>
                prev.map((n) =>
                    n.id === editingNotice.id ? updatedNotice : n
            ));
        } else {
            // 새 공지사항 작성
            const newNotice = {
                id: Date.now(),
                title,
                content,
                updateDate: now,
                view: 0,
            };
            setNotices([newNotice, ...notices]);
        }
        // 편집 모드 종료
        setIsEditing(false)
        setEditingNotice(null)
    }

    const handleCancel = () => {
        setIsEditing(false);
        setEditingNotice(null);
    }

    return (
        <div className="editor-container">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="editor-title"
                placeholder="제목"
            />

            <Suspense fallback={<p>Loading Editor...</p>}>
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder="내용을 입력하세요."
                    theme="snow"
                    className="react-quill"
                />
            </Suspense>

            {isAdmin &&
                <div className="button-container">
                    <button onClick={handleSave}>저장</button>
                    <button onClick={handleCancel}>취소</button>
                </div>
            }
        </div>
    );
}

export default NoticeEditor;