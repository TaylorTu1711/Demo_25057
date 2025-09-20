import React, { useState } from 'react';
import '../css/Navbar.css';
import logo from '../assets/LOGO-MO.png';
import { logout } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-2 sticky-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo bên trái */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" width="200" height="200" className="me-3" />
        </Link>

        {/* Tiêu đề ở giữa */}
        <div className="flex-grow-1 text-center d-none d-lg-block">
          <span
            className="navbar-title fw-bold fs-4"
            style={{ color: 'rgba(32, 64, 154, 1)' }}
          >
            HỆ SCADA CÁC MÁY PLENMA
          </span>
        </div>

        {/* Menu bên phải */}
        <div className="d-flex">
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse justify-content-end ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav align-items-center gap-3">
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/" style={{ color: 'rgba(32, 64, 154, 1)', fontSize: '1.25rem' }}>🏠 Trang chủ</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-primary fw-semibold" style={{ color: 'rgba(32, 64, 154, 1)', fontSize: '1.25rem' }} onClick={handleLogout}>
                  🔓 Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
