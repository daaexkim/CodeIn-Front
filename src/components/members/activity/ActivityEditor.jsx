import React, {useState, useEffect, useRef} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../styles/Activity/ActivityEditor.css";

function Buttons({
    onLeftButtonClick,
    onRightButtonClick,
    leftButtonText,
    rightButtonText
}) {
    return (
        <div className="editor-buttons">
            <button className="left-button" onClick={onLeftButtonClick}>{leftButtonText}</button>
            <button className="right-button" onClick={onRightButtonClick}>{rightButtonText}</button>
        </div>
    );
}

function ActivityEditor({
    activity,
    categories,
    onSave,
    onCancel
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("활동 유형 선택");
    const [images, setImages] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);

    // 수정 모드
    const [isModifyMode, setIsModifyMode] = useState(false);

    // 기존 데이터를 가져오는 함수
    const loadData = (act) => {
        setTitle(act.title || "");
        setContent(act.content || "");
        setAuthor(act.author);
        setCategory(act.category || "활동 유형 선택");
        setImages(act.images || []);
        setMainImageIndex(act.mainImageIndex || 0);
        setIsModifyMode(false);
    };

    const titleRef = useRef(null);
    const authorRef = useRef(null);
    const categoryRef = useRef(null);

    useEffect(() => {
        if (titleRef.current) titleRef.current.focus();
    }, []);

    useEffect(() => {
        if (activity) {
            loadData(activity);
        } else {
            setTitle("");
            setContent("");
            setAuthor("");
            setCategory("활동 유형 선택");
            setImages([]);
            setMainImageIndex(0);
            setIsModifyMode(true);
        }
    }, [activity]);

    // 이미지 업로드 랜드러
    const handleImageUpload = async (e) => {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;

        const newImages = [];
        for (let i=0; i<fileList.length; i++) {
            const file = fileList[i];
            const base64 = await fileToBase64(file);
            newImages.push(base64);
        }
        setImages((prevImages) => [...prevImages, ...newImages]);
    };
    // 파일 ->> base64 변환 함수
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // 대표 사진 선택 핸들러
    const handleSelectMainImage = (index) => {
        setMainImageIndex(index);
    };

    // 저장 버튼 핸들러
    const handleSaveClick = () => {
        if (!title) {
            alert("제목을 입력해주세요.");
            titleRef.current.focus();
            return ;
        }
        if (!author) {
            alert("대표자명을 입력해주세요.");
            authorRef.current.focus();
            return;
        }
        if (categoryRef.current.value === "") {
            alert("활동 유형을 선택하세요.");
            categoryRef.current.focus();
            return;
        }

        onSave({
            title,
            content,
            author,
            category,
            images,
            mainImageIndex,
        });
    };

    // 삭제 버튼 클릭 핸들러
    const handleDeleteClick = () => {
        const confirmed = window.confirm("정말 삭제하시겠습니까?");
        if (confirmed) {
            onSave({
                deleteRequested: true,
                id: activity.id
            });
        }
    };

    // 수정 버튼 클릭 핸들러
    const handleModifyClick = () => {
        setIsModifyMode(true);
    };

    // 취소 버튼 클릭 핸들러
    const handleCancleClick = () => {
        // 새로 작성하면 onCancel()로 에디터 닫기
        if (!activity) {
            onCancel();
            return;
        }
        // 기존 내용 편집 취소
        loadData(activity);
    };

    const modules = {
        toolbar: isModifyMode ? [
            [{header: [1, 2, 3, 4, 5, false]}],
            [{font: []}],
            [{size: ["small", false, "large", "huge"]}],
            [{color: []}, {background: []}],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{script: "sub"}, {script: "super"}],
            [
                {list: "ordered"},
                {list: "bullet"},
                {indent: "-1"},
                {indent: "+1"}
            ],
            ["link", "image", "video"],
            ["clean"],
        ] : false, // 읽기 전용 모드 시 toolbar 숨기기
    };

    const formats = [
        "header",
        "font",
        "size",
        "color",
        "background",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "script",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
    ];

    return (
        <div className="activity-editor-container">
            <div className="editor-header-container">
                {/* 제목 */}
                <input
                    id="title"
                    type="text"
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                    disabled={!isModifyMode}
                    required
                />
                
                <div className="editor-header">
                    {/* 대표자명 */}
                    <input
                        id="author"
                        type="text"
                        ref={authorRef}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="대표자명"
                        disabled={!isModifyMode}
                        required
                    />

                    {/* 카테고리 선택 */}
                    <select
                        id="category"
                        ref={categoryRef}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={!isModifyMode}
                        required
                    >
                        <option value="">활동 유형 선택</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    
                    {/* 저장&취소 / 수정/삭제 버튼 */}
                    {activity ? (
                        // 기존 활동인 경우
                        isModifyMode ? (
                            // 저장/취소 버튼
                            <Buttons
                                onLeftButtonClick={handleSaveClick}
                                onRightButtonClick={handleCancleClick}
                                leftButtonText="저장"
                                rightButtonText="취소"
                            />
                        ) : (
                            // 수정/삭제 버튼
                            <Buttons
                                onLeftButtonClick={handleModifyClick}
                                onRightButtonClick={handleDeleteClick}
                                leftButtonText="수정"
                                rightButtonText="삭제"
                            />
                        )
                    ) : (
                        // 새로 작성하는 경우
                        <Buttons
                            onLeftButtonClick={handleSaveClick}
                            onRightButtonClick={onCancel}
                            leftButtonText="저장"
                            rightButtonText="취소"
                        />
                    )}
                </div>
            </div>

            {/* ReactQuill 에디터 */}
            <div className="quill-container">
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    placeholder="내용을 입력하세요"
                    modules={modules}
                    formats={formats}
                    readOnly={isModifyMode}
                    theme="snow"
                />
            </div>

            {/* 이미지 업로드 */}
            {isModifyMode && (
                <div className="image-upload-section">
                    <label>이미지 업로드</label>
                    <input
                        id="file"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                    />
                </div>
            )}

            <div className="images">
                {images.map((imgSrc, index) => (
                    <div
                        key={index}
                        className={`image ${index === mainImageIndex ? " selected" : ""}`}
                        onClick={() => handleSelectMainImage(index)}
                    >
                        <img src={imgSrc} alt={`이미지-${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActivityEditor;