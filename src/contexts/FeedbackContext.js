import React, { createContext, useContext, useState } from "react";

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const [feedbacks, setFeedbacks] = useState([]); // 피드백 상태 관리

  const addFeedback = (newFeedback) => {
    setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]); // 기존 배열에 새 피드백 추가
  };

  const deleteFeedback = (id) => {
    setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id)); // 피드백 삭제
  };

  const editFeedback = (id, updatedFeedback) => {
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, ...updatedFeedback } : feedback
      )
    );
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback, deleteFeedback, editFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedbackContext() {
  return useContext(FeedbackContext);
}
