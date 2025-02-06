import React, {useContext, useState} from "react";
import { NoticeContext } from "../../../contexts/NoticeContext";
import "../../../styles/notice/NoticeList.css"

function NoticeList() {
    const {
        notices,
        setNotices,
        setFilteredNotices,
        isAdmin,
        setIsEditing,
        setEditingNotice,
        currentNotices,
        currentPage,
    } = useContext(NoticeContext);
    const [search, setSearch] = useState("");

    // 검색 버튼 핸들러
    const handleSearch = () => {
        setFilteredNotices(
            notices.filter((notice) =>
                notice.title.includes(search)));
        setSearch("");
    }

    // 제목 클릭 시 편집 모드로 전환, 조회수 증가
    const handleEditNotice = (notice) => {
        const updatedNotice = {
            ...notice,
            view: notice.view + 1,
            updateDate: new Date(),
        };
        setNotices(notices.map((n) =>
            notices.id === n.id
                ? updatedNotice
                : n
        ));
        setIsEditing(true);
        setEditingNotice(updatedNotice);
    }

    // 삭제 버튼 핸들러
    const handleDelete = (selected) => {
        setNotices((prev) =>
            prev.filter((notice) =>
                notice.id !== selected.id
        ));
    }
    
    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="검색어를 입력하세요"
                />
                <button onClick={handleSearch}>검색</button>
            </div>
            
            <table className="notice-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>공지일</th>
                        <th>조회수</th>
                        {isAdmin && <th>삭제</th>}
                    </tr>
                </thead>

                <tbody>
                    {currentNotices.map((notice, index) => (
                        <tr key={notice.id}>
                            {/* 전체 목록 기준으로 번호 계싼 */}
                            <td>{index + 1 + (currentPage - 1) * 10}</td>
                            <td>
                                <span onClick={() => handleEditNotice(notice)}>{notice.title}</span>
                            </td>
                            <td>{notice.updateDate}</td>
                            <td>{notice.view}</td>
                            {isAdmin && (
                                <td>
                                    <span onClick={() => handleDelete(notice)}>삭제</span>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default NoticeList;