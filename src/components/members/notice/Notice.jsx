import React, {useContext} from "react";
import NoticeList from "./NoticeList";
import NoticeEditor from "./NoticeEditor";
import { NoticeContext } from "../../../contexts/NoticeContext";
import "../../../styles/notice/Notice.css";

function Notice() {
    const {
        isAdmin,
        setIsAdmin,
        isEditing,
        setIsEditing,
        setEditingNotice,
        currentPage,
        setCurrentPage,
        totalPages,
    } = useContext(NoticeContext);

    // 공지사항 작성 버튼 핸들러
    const handleAddButton = () => {
        setIsEditing(true);
        setEditingNotice(null);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="notice-container">
            <div className="notice-header">
                <h2>공지사항</h2>
                {!isEditing && (
                    <div className="writeAndAdmin">
                        <button onClick={handleAddButton}>공지사항 작성</button><br />
                        <button onClick={() => setIsAdmin(!isAdmin)}>관리자 {isAdmin ? "on" : "off"}</button>
                    </div>
                )}
            </div>

            {/* 공지사항 목록 또는 편집기*/}
            <div className="notice-main-container">
                {isEditing ? <NoticeEditor /> : <NoticeList />}
            </div>

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
        </div>
    );
}

export default Notice;