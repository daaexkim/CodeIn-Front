import React, { useState } from "react";
import "../styles/feedbacks.css";

// 상대 시간 계산 함수
function getRelativeTime(dateString, timeString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const [hour, minute, second] = timeString.split(":").map(Number);
    const feedbackDate = new Date(year, month - 1, day, hour, minute, second);
    const now = new Date();

    const diffInMilliseconds = now - feedbackDate;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

    if (diffInMinutes < 1) return "방금 전";
    if (diffInMinutes < 60) return `${diffInMinutes} 분 전`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}시간 전`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}일 전`;
}

// 개별 피드백 컴포넌트
function Feedback({ id, name, title, content, date, time, views, onRemove, onClick }) {
    return (
        <div className="feedback" onClick={() => onClick(id)}>
            <h3>{title}</h3>
            <button className="remove-button" onClick={(e) => {e.stopPropagation(); onRemove(id);}}>X</button>
            <p className="feedback-content">{content}</p>
            <div className="name-and-time">
                <span>{name || "익명"} | {getRelativeTime(date, time)}</span>
            </div>
        </div>
    );
}

function Feedbacks() {
    // 상태 및 초기 데이터 설정
    const [feedbacks, setFeedbacks] = useState([
        { id: 3, name: "nameB", title: "게시글3", content: "세번째 게시글입니다.", date: "2024-11-15", time: "08:08:08", views: 0 },
        { id: 2, name: null, title: "게시글2", content: "두번째 게시글입니다.", date: "2024-11-14", time: "12:34:56", views: 0 },
        { id: 1, name: "nameA", title: "게시글1", content: "첫번째 게시글입니다.", date: "2024-11-11", time: "12:00:00", views: 0 },
    ]);
    const [nextId, setNextId] = useState(4);
    const [inputTitle, setInputTitle] = useState("");
    const [inputContent, setInputContent] = useState("");
    const dateAndTime = new Date();

    // 제목 및 내용 변경 핸들러
    const handleTitleChange = (e) => setInputTitle(e.target.value);
    const handleContentChange = (e) => setInputContent(e.target.value);

    // 새 피드백 추가
    const handleAddFeedback = () => {
        const newFeedback = {
            id: nextId,
            title: inputTitle,
            content: inputContent,
            date: dateAndTime.toISOString().split("T")[0],
            time: dateAndTime.toTimeString().split(" ")[0],
            views: 0
        };
        setFeedbacks([newFeedback, ...feedbacks]);
        setNextId(nextId + 1);
        setInputTitle("");
        setInputContent("");
    };

    // 피드백 삭제
    const handleRemoveFeedback = (id) => {
        const updatedFeedbacks = feedbacks.filter((feedback) => feedback.id !== id);
        setFeedbacks(updatedFeedbacks);
    };

    // 조회수 증가
    const handleIncreaseViewCount = (id) => {
        setFeedbacks(feedbacks.map((feedback) => 
            feedback.id === id ? { ...feedback, views: feedback.views + 1 } : feedback
        ));
    };

    // 조회수가 많은 상위 3개의 피드백
    const topFeedbacks = [...feedbacks]
        .filter(feedback => feedback.views > 0)
        .sort((a, b) => b.views - a.views)
        .slice(0, 3);

    // 모든 피드백 목록 생성
    const feedbackList = feedbacks.map((feedback) => (
        <Feedback
            key={feedback.id}
            id={feedback.id}
            name={feedback.name}
            title={feedback.title}
            content={feedback.content}
            date={feedback.date}
            time={feedback.time}
            views={feedback.views}
            onRemove={handleRemoveFeedback}
            onClick={handleIncreaseViewCount}
        />
    ));

    // 입력값 유효성 검사
    const isButtonDisabled = !inputTitle || !inputContent;

    return (
        <div className="allContainer">
            <main>
                <input value={inputTitle} placeholder="title" onChange={handleTitleChange} />
                <input value={inputContent} placeholder="content" onChange={handleContentChange} />
                <button onClick={handleAddFeedback} disabled={isButtonDisabled}>
                    새 게시글 작성
                </button>
                {feedbackList}
            </main>
            <aside>
                <h2>Top 3 게시글</h2>
                {topFeedbacks.map((feedback) => (
                    <div key={feedback.id} className="top-feedback">
                        <h4>{feedback.title}</h4>
                        <p>{feedback.content}</p>
                        <span>조회수: {feedback.views}</span>
                    </div>
                ))}
            </aside>
        </div>
    );
}

export default Feedbacks;
