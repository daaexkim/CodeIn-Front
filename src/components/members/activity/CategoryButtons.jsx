import React, { useState } from "react";
import "../../../styles/CategoryButtons.css";

function CategoryButtons({ categories, onCategoryChange, onAddCategory }) {
  const [isAdding, setIsAdding] = useState(false); // 입력 필드 표시 여부
  const [newCategory, setNewCategory] = useState(""); // 새 카테고리명

  const handleAddClick = () => setIsAdding(true); // 입력 필드 표시
  const handleInputChange = (e) => setNewCategory(e.target.value); // 입력값 업데이트
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim()); // 새 카테고리 전달
      setNewCategory(""); // 입력 초기화
      setIsAdding(false); // 입력 필드 숨김
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddCategory(); // Enter 키로 카테고리 추가
  };

  return (
    <div className="category-buttons">
      {categories.map((category) => (
        <button key={category} onClick={() => onCategoryChange(category)}>
          {category}
        </button>
      ))}
      {isAdding ? (
        <div className="add-category">
          <input
            type="text"
            value={newCategory}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="새 카테고리"
          />
          <button onClick={handleAddCategory}>확인</button>
        </div>
      ) : (
        <button onClick={handleAddClick}>+</button>
      )}
    </div>
  );
}

export default CategoryButtons;
