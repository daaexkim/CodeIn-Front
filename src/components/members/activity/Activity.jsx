import React, {useState, useContext} from "react";
import Categories from "./Categories";
import ActivityCards from "./ActivityCards";
import ActivityEditor from "./ActivityEditor";
import { ActivityContext } from "../../../contexts/ActivityContext";
import "../../../styles/Activity/Activity.css";


function Activity() {
  const {
    activities,
    setActivities,
    categories,
    selectedCategory,
    selectedSemester,
    decideSemester,
  } = useContext(ActivityContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // 학기/카테고리 필터
  const filteredActivities = activities.filter((activity) => {
    const semesterStart = decideSemester(activity.startDate)    
    const semesterUpdate = decideSemester(activity.updateDate)    
    
    const matchSemester =
      selectedSemester === "전체" ||
      selectedSemester === semesterStart ||
      selectedSemester === semesterUpdate;
    const matchCategory =
      selectedCategory === "전체" ||
      selectedCategory === activity.category;
    return matchSemester && matchCategory;
  });

  // 페이지에 표시될 활동카드 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  // 총 페이지 수 계싼
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  // 새 활동카드 추가 버튼 핸들러
  const handleAddActivity = () => {
    setIsEditing(true);
    setEditingActivity(null);
  };

  // 활동카드 클릭할 때
  const handleCardClick = (activity) => {
    setIsEditing(true);
    setEditingActivity(activity);
  };

  // 에디터에서 저장할 때
  const handleSaveActivity = (data) => {
    if (data.deleteRequested) {
      // 삭제
      setActivities((prevActivities) =>
        prevActivities.filter((activity) =>
          activity.id !== data.id));
      setIsEditing(false);
      setEditingActivity(null);
      return;
    }
    const now = Date.now();

    if (editingActivity) {
      // 기존 내용 수정
      setActivities((prevActivities) => {
        const updatedActivities = prevActivities.map((activity) => {
          if (activity.id === editingActivity.id) {
            return {
              ...activity,
              ...data,
              updateDate: now,
            };
          }
          return activity;
        });
        return updatedActivities.sort(
          (a, b) => (b.updateDate || 0) - (a.updateDate || 0)
        );
      });
    } else {
      // 새로 추가
      const newId = activities.length
        ? Math.max(...activities.map((activity) => activity.id)) + 1
        : 1;
      const newActivity = {
        id: newId,
        ...data,
        startDate: now,
        updateDate: now,
      };

      setActivities((prevActivities) => {
        const updatedActivities = [...prevActivities, newActivity];
        return updatedActivities.sort((a, b) => (b.updateDate || 0) - (a.updateDate || 0));
      });
    }

    // 편집 종료
    setIsEditing(false);
    setEditingActivity(null);
  };

  // 에디터에서 취소할 때
  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditingActivity(null);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="activity-container">
      {/* 왼쪽 사이드바 */}
      <aside className="activity-sidebar">
        <Categories />
      </aside>

      {/* 오른쪽 메인 */}
      <main className="activity-main">
        <h1 className="page-title">동아리 활동 게시판</h1>

        {isEditing ? (
          <ActivityEditor
            key={editingActivity ? editingActivity.id : "new"}
            activity={editingActivity}
            categories={categories.filter((category) => category !== "전체")}
            onSave={handleSaveActivity}
            onCancel={handleCancelEditing}
          />
        ) : (
          <>
            {/* 활동 카드 추가 버튼 */}
            <div className="add-button-container">
              <button
                className="add-button"
                onClick={handleAddActivity}
              >
                추가
              </button>
              </div>

            {/* 활동 카드 목록 */}
            <ActivityCards
              activities={currentActivities}
              onCardClick={handleCardClick}
            />

            {/* 페이지네이션 */}
            <div className="pagination-container">
              {totalPages > 1 && (
                <div className="pagination">
                  {Array.from({length: totalPages}, (_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        className={`page-button ${currentPage === pageNum ? "active" : ""}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Activity;