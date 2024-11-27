import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css";
import SideBar from "./components/SideBar";
import useScreenSize from "./hooks/useScreenSize";
import { IMAGES } from "./constants/images";
import Scroll from "./pages/Scroll";
import About from "./pages/About";
import Project from "./pages/Project";
import Recruit from "./pages/Recruit";
import Members from "./pages/Members";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feedback from "./components/members/feedback/Feedback";
import FeedbackItem from "./components/members/feedback/FeedbackItem";
import { FeedbackProvider } from "./contexts/FeedbackContext";

function AppContent() {
  const location = useLocation();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    const timer = setTimeout(() => setFadeIn(false), 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="main-container">
      <SideBar />
      <div className="main-content">
        {location.pathname === "/" && (
          <section className="hero-section">
            <img
              src={IMAGES.codeinLogo}
              alt="Code In Logo"
              className={`codein-logo ${fadeIn ? "fade-in" : ""}`}
            />
            <p className="hero-text">가천대학교 IT 중앙 동아리</p>
            <img src={IMAGES.gachonLogo} alt="Gachon Logo" className="gachon-logo" />
            <img src={IMAGES.scroll} alt="scroll" className="scroll-image" />
          </section>
        )}
        <Routes>
          <Route path="/" element={<Scroll />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/members" element={<Members />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/members/feedback" element={<Feedback />} />
          <Route path="/members/feedbackitem" element={<FeedbackItem />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  useScreenSize();

  return (
    <FeedbackProvider>
      <Router>
        <AppContent />
      </Router>
    </FeedbackProvider>
  );
}

export default App;
