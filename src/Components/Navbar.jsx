import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import logo from '../Assets/logo.png';
import profile from '../Assets/profile.jpg';

const Navbar = ({ setSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isSearchPage = location.pathname.startsWith('/search');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'search') {
      setSearchQuery(decodeURIComponent(pathParts[2] || ''));
    } else {
      setSearchQuery('');
    }
  }, [location]);

  return (
    <nav
      className={`navbar px-3 py-2 shadow-sm sticky-top d-flex align-items-center justify-content-between flex-wrap ${
        theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
      }`}
    >
      {/* Left: Menu and Logo */}
      <div className="d-flex align-items-center">
        <i
          className="bi bi-list fs-4 me-3"
          onClick={() => setSidebar((prev) => !prev)}
          style={{ cursor: 'pointer' }}
        ></i>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="img-fluid"
            style={{ maxWidth: '120px', height: 'auto' }}
          />
        </Link>
      </div>

      {/* Center: Search bar */}
      {/* Center: Search bar */}
<div className="flex-grow-1 mx-3 d-flex justify-content-center">
  {/* Show input on search page OR if screen width is ≥576px (tablet/desktop) */}
  {(isSearchPage || window.innerWidth >= 576) ? (
    <form
      className="w-100"
      onSubmit={handleSubmit}
      style={{ maxWidth: window.innerWidth >= 992 ? '600px' : '100%' }}
    >
      <div className="input-group">
        <input
          type="text"
          className={`form-control ${
            theme === 'dark' ? 'bg-secondary text-white border-0' : ''
          }`}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className={`btn ${
            theme === 'dark' ? 'btn-secondary' : 'btn-outline-secondary'
          }`}
          type="submit"
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  ) : (
    <div className="d-sm-none">
      <button
        className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
        onClick={() => navigate('/search')}
      >
        <i className="bi bi-search"></i>
      </button>
    </div>
  )}
</div>

      {/* Right: Icons and theme toggle */}
     <div className="d-flex align-items-center gap-3">
  {!isSearchPage && (
    <>
      <i className="bi bi-bell fs-5"></i>
      <img
        src={profile}
        alt="profile"
        width="32"
        height="32"
        className="rounded-circle border border-light"
      />
    </>
  )}
  <button
    className={`btn btn-sm ${
      theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'
    }`}
    onClick={toggleTheme}
  >
    <span className="d-none d-lg-inline">
      {theme === 'light' ? (
        <>
          <i className="bi bi-moon me-1"></i> Dark
        </>
      ) : (
        <>
          <i className="bi bi-sun me-1"></i> Light
        </>
      )}
    </span>
    <span className="d-lg-none">
      {theme === 'light' ? (
        <i className="bi bi-moon"></i>
      ) : (
        <i className="bi bi-sun"></i>
      )}
    </span>
  </button>
</div>

    </nav>
  );
};

export default Navbar;
