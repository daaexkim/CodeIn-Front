import React, { useState } from "react";
import CategoryButtons from "../components/members/activity/CategoryButtons";
import ActivityCard from "../components/members/activity/ActivityCard";
import "../styles/ActivityPage.css";

// 활동 데이터 (컴포넌트 외부에 위치)
const activityList = [
  {
    id: 1,
    title: "제목 1",
    author: "대표자 이름",
    imageUrl: "이미지 링크",
    category: "프로젝트",
    startDate: "2024-01-15",
    endDate: "2024-05-20",
  },
  {
    id: 2,
    title: "제목 2",
    author: "대표자 이름",
    imageUrl: "이미지 링크",
    category: "공모전",
    startDate: "2024-06-01",
    endDate: "2024-10-15",
  },
  {
    id: 3,
    title: "제목 3",
    author: "대표자 이름",
    imageUrl: "이미지 링크",
    category: "언어 스터디",
    startDate: "2023-07-01",
    endDate: "2023-12-31",
  },
  {
    id: 4,
    title: "제목 4",
    author: "대표자 이름",
    imageUrl: "이미지 링크",
    category: "프로젝트",
    startDate: "2023-01-01",
    endDate: "2023-06-30",
  },
];

function ActivityPage() {
  const [selectedSemester, setSelectedSemester] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [categories, setCategories] = useState(["전체", "프로젝트", "공모전", "언어 스터디"]);
  const semesters = ["전체", "2024년 상반기", "2024년 하반기", "2023년 상반기", "2023년 하반기"];

  // 새 카테고리 추가
  const handleAddCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // 선택한 학기 및 카테고리 기준으로 활동 필터링
  const filteredActivityList = activityList.filter((activity) => {
    const startDate = new Date(activity.startDate);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;

    const semesterKey =
      month >= 3 && month <= 8
        ? `${year}년 상반기`
        : `${month >= 9 ? year : year - 1}년 하반기`;

    return (
      (selectedSemester === "전체" || semesterKey === selectedSemester) &&
      (selectedCategory === "전체" || activity.category === selectedCategory)
    );
  });

  return (
    <div className="activity-container">
      {/* 왼쪽 학기 선택 및 카테고리 */}
      <aside className="activity-sidebar">
        <form className="semester-form">
          <label htmlFor="semester-select">학기 선택:</label>
          <select
            id="semester-select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            {semesters.map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </form>
        <CategoryButtons
          categories={categories}
          onCategoryChange={setSelectedCategory}
          onAddCategory={handleAddCategory}
        />
      </aside>

      {/* 오른쪽 활동 카드 */}
      <main className="activity-main">
        <h1 className="page-title">동아리 활동 게시판</h1>
        <div className="activity-list">
          {filteredActivityList.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default ActivityPage;
