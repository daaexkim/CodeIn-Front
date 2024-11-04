import { useEffect } from 'react';

const useScreenSize = () => {
  useEffect(() => {
    const setScreenSize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setScreenSize(); // 처음 로드 시 실행

    window.addEventListener('resize', setScreenSize); // 리사이즈 이벤트 추가

    return () => {
      window.removeEventListener('resize', setScreenSize); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, []);
};

export default useScreenSize;
