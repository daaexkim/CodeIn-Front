import React, {useState, useEffect, createContext} from "react";

export const NoticeContext = createContext();

export function NoticeProvider({children}) {
    // 전역 상태 정의
    const [notices, setNotices] = useState([
        {id: 1, title: "title1", content: "content1", updateDate: "2025-02-01", view: 3},
        {id: 2, title: "title2", content: "content1", updateDate: "2024-12-31", view: 10},
    ]);
    const [filteredNotices, setFilteredNotices] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true); // 관리자 전용 기능들
    const [isEditing, setIsEditing] = useState(false);
    const [editingNotice, setEditingNotice] = useState(null);

    // 공지사항 목록 정렬

    useEffect(() => {
        setNotices((prev) => 
            [...prev].sort((a, b) =>
                new Date(b.updateDate) - new Date(a.updateDate)));
    }, [notices]);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatingList = filteredNotices.length > 0 ? filteredNotices : notices;
    const currentNotices = paginatingList.slice(startIndex, startIndex+itemsPerPage);
    const totalPages = Math.ceil(paginatingList.length / itemsPerPage);
    
    const value = {
        notices,
        setNotices,
        filteredNotices,
        setFilteredNotices,
        isAdmin,
        setIsAdmin,
        isEditing,
        setIsEditing,
        editingNotice,
        setEditingNotice,
        currentNotices,
        currentPage,
        setCurrentPage,
        totalPages,
    };

    return (
        <NoticeContext.Provider value={value}>
            {children}
        </NoticeContext.Provider>
    )

}