import React, {createContext, useState, useEffect} from "react";

export const ActivityContext = createContext();

export function ActivityProvider({children}) {
    // 전역 상태 정의
    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState(["전체", "프로젝트", "공모전", "언어 스터디"]);
    const [selectedCategory, setSelectedCategory] = useState("전체");

    const [semesters, setSemesters] = useState(["전체"]);
    const [selectedSemester, setSelectedSemester] = useState("전체");

    const decideSemester = (date) => {  
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
  
        return month >= 3 && month <= 8
            ? `${year}년 상반기`
            : `${month >= 9 ? year : year - 1}년 하반기`;
    };

    // activities 상태가 변화할 때마다 새로운 학기를 자동 등록
    useEffect(() => {
        const newSemesters = new Set(semesters);
        activities.forEach((activity) => {
            if (activity.startDate) {
                newSemesters.add(decideSemester(activity.startDate));
            }
            if (activity.updateDate) {
                newSemesters.add(decideSemester(activity.updateDate));
            }
        });
        newSemesters.add("전체");
        setSemesters(Array.from(newSemesters).sort().reverse());
    }, [activities]);

    const value = {
        activities,
        setActivities,
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        semesters,
        selectedSemester,
        setSelectedSemester,
    };

    return (
        <ActivityContext.Provider value={value}>
            {children}
        </ActivityContext.Provider>
    );
};