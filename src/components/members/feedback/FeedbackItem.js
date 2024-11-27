import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedbackContext } from "../../../contexts/FeedbackContext";
import "../../../styles/FeedbackItem.css";

function FeedbackItem() {
  const { addFeedback } = useFeedbackContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    const newFeedback = {
      id: Date.now(),
      title,
      content,
    };

    addFeedback(newFeedback);
    navigate("/members/feedback");
  };

  return (
    <div className="feedback-item-container">
      <input
        className="feedback-item-input"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="feedback-item-textarea"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="button-container">
        <button
          className="feedback-item-list-button"
          onClick={() => navigate("/members/feedback")}
        >
          목록
        </button>
        <button
          className="feedback-item-save-button"
          onClick={handleSave}
          disabled={!title || !content}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default FeedbackItem;
