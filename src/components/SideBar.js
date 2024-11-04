import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideBar.css';
import { IMAGES } from '../constants/images';

function SideBar() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <header className="sidebar">
      <Link to="/"> {/* codeinLogo를 클릭하면 홈 경로('/')로 이동 */}
        <img src={IMAGES.codeinLogo} alt="Code In Logo" className="codein-logo-sidebar" />
      </Link>
      <nav>
        <ul className="sidebar-menu">
          <li><Link to="/about">ABOUT US</Link></li>
          <li><Link to="/project">PROJECT</Link></li>
          <li><Link to="/members">FOR MEMBERS</Link></li>
          <li><Link to="/recruit">RECRUIT</Link></li>
        </ul>
      </nav>
      <button className="login-btn" onClick={goToLogin}>LOGIN</button>
    </header>
  );
}

export default SideBar;
