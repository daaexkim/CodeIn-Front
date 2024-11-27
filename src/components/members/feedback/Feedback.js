import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedbackContext } from "../../../contexts/FeedbackContext";
import "../../../styles/Feedback.css";

function Feedback() {
  const { feedbacks, deleteFeedback, editFeedback } = useFeedbackContext();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const itemsPerPage = 5;

  // 최신 글이 앞에 오도록 역순 정렬
  const sortedFeedbacks = [...feedbacks].reverse();

  // 현재 페이지에 표시될 피드백 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFeedbacks = sortedFeedbacks.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(sortedFeedbacks.length / itemsPerPage);

  // 삭제 확인 핸들러
  const handleDelete = (id) => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      deleteFeedback(id); // 삭제 진행
    }
  };

  // 수정 버튼 핸들러
  const handleEdit = (feedback) => {
    setIsEditing(true);
    setEditId(feedback.id);
    setEditTitle(feedback.title);
    setEditContent(feedback.content);
  };

  // 수정 저장 핸들러
  const handleSaveEdit = () => {
    editFeedback(editId, { title: editTitle, content: editContent });
    setIsEditing(false);
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div className="feedback-container">
      {!isEditing ? (
        <>
          <button
            className="feedback-create-button"
            onClick={() => navigate("/members/feedbackitem")}
          >
            피드백 작성
          </button>

          <div className="feedback-list">
            {currentFeedbacks.map((feedback) => (
              <div className="feedback-item" key={feedback.id}>
                <h3>{feedback.title}</h3>
                <p>{feedback.content}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(feedback.id)}
                >
                  삭제
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(feedback)}
                >
                  수정
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="edit-container">
          <input
            className="edit-input"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="edit-textarea"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button className="save-button" onClick={handleSaveEdit}>
            저장
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              setIsEditing(false);
              setEditId(null);
              setEditTitle("");
              setEditContent("");
            }}
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
}

export default Feedback;
