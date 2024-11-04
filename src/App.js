import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './styles/App.css';
import SideBar from './components/SideBar';
import useScreenSize from './hooks/useScreenSize';
import { IMAGES } from './constants/images';
import Scroll from './pages/Scroll';
import About from './pages/About';
import Project from './pages/Project';
import Recruit from './pages/Recruit';
import Members from './pages/Members';
import Login from './pages/Login';

function AppContent() {
  const location = useLocation(); // 현재 경로 가져오기
  const [fadeIn, setFadeIn] = useState(false); // 페이드인 상태 관리

  useEffect(() => {
    setFadeIn(true); // 애니메이션 시작
    const timer = setTimeout(() => setFadeIn(false), 1000); // 애니메이션 후 페이드인 상태 해제

    return () => clearTimeout(timer); 
  }, [location.pathname]); 

  return (
    <div className="main-container">
      <SideBar />
      <div className="main-content">
        {location.pathname === '/' && (
          <section className="hero-section">
            <img
              src={IMAGES.codeinLogo}
              alt="Code In Logo"
              className={`codein-logo ${fadeIn ? 'fade-in' : ''}`} // 페이드인 클래스 조건부 적용
            />
            <p className="hero-text">가천대학교 IT 중앙 동아리</p>
            <img src={IMAGES.gachonLogo} alt="Gachon Logo" className="gachon-logo" />
            <img src={IMAGES.scroll} alt="scroll" className="scroll-image" />
          </section>
          
        )}

        <Routes>
          <Route path="/" element={<Scroll />} /> {/* 기본 메인 대시보드 */}
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/members" element={<Members />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  useScreenSize(); // 화면 크기 관리 커스텀 훅 호출

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
