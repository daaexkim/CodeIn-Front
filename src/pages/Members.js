import React from "react";
import { useNavigate } from "react-router-dom";
import { useFeedbackContext } from "../contexts/FeedbackContext";
import "../styles/Members.css";

function Members() {
  const navigate = useNavigate();
  const { feedbacks } = useFeedbackContext(); // 피드백 데이터를 가져옴

  const handleNavigation = (path) => {
    navigate(path); // 클릭 시 지정된 경로로 이동
  };

  // 최근 3개의 피드백 제목 가져오기
  const recentFeedbacks = feedbacks.slice(0, 3);

  return (
    <div className="members-container">
      <h1 className="members-title">동아리 부원들의 공간</h1>
      <div className="members-grid">
        <div
          className="members-box"
          onClick={() => handleNavigation("/members/notice")}
        >
          <h2>공지사항</h2>
          <ul>
            <li>title 1</li>
            <li>title 2</li>
            <li>title 3</li>
          </ul>
          <p>.....</p>
        </div>
        <div
          className="members-box"
          onClick={() => handleNavigation("/members/feedback")}
        >
          <h2>피드백 게시판</h2>
          <ul>
            {recentFeedbacks.map((feedback) => (
              <li key={feedback.id}>{feedback.title}</li>
            ))}
          </ul>
        </div>
        <div
          className="members-box"
          onClick={() => handleNavigation("/members/reservation")}
        >
          <h2>동아리방 예약 시스템</h2>
          <ul>
            <li>title 1</li>
            <li>title 2</li>
            <li>title 3</li>
          </ul>
          <p>.....</p>
        </div>
      </div>
    </div>
  );
}

export default Members;
