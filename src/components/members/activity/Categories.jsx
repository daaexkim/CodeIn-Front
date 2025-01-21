import React from "react";
import "../../../styles/Activity/Categories.css";

function Categories({
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    semesters,
    selectedSemester,
    setSelectedSemester,
}) {
    // 새 카테고리 추가 핸들러
    const handleAddCategory = () => {
        const newCategoryName = prompt("새 카테고리 이름을 입력해주세요: ");
        if (newCategoryName && !categories.includes(newCategoryName)) {
            setCategories([...categories, newCategoryName]);
        }
    };

    return (
        <>
            {/*학기 선택*/}
            <form className="semester-form">
                <label htmlFor="semester-select">학기 선택</label>
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

            {/* 카테고리 버튼들 */}
            <div className="category-buttons">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={category === selectedCategory ? "active" : ""}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}

                {/* 새 카테고리 추가 버튼 */}
                <button onClick={handleAddCategory}>
                    +
                </button>
            </div>
        </>
    );
}

export default Categories;