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
  const isHomePage = location.pathname === '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  useEffect(() => {
    // If user navigated to /search/:query via button, update searchQuery
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'search') {
      setSearchQuery(decodeURIComponent(pathParts[2] || ''));
    }
  }, [location]);

  return (
    <nav
      className={`navbar navbar-expand-lg px-3 py-2 shadow-sm sticky-top ${
        theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
      }`}
    >
      {/* Left: Menu and Logo */}
      <div className="d-flex align-items-center me-3">
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
            style={{ maxWidth: '150px', height: 'auto' }}
          />
        </Link>
      </div>

      {/* Center: Search input (only on /search) or icon (on mobile) */}
      <div className="flex-grow-1 d-flex justify-content-center">
        {isSearchPage ? (
          <form className="d-flex w-100 mx-3" onSubmit={handleSubmit}>
            <input
              type="text"
              className={`form-control me-2 ${
                theme === 'dark' ? 'bg-secondary text-white border-0' : ''
              }`}
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className={`btn ${
                theme === 'dark' ? 'btn-secondary' : 'btn-outline-secondary'
              }`}
            >
              <i className="bi bi-search"></i>
            </button>
          </form>
        ) : (
          <div className="d-lg-none">
            <button
              className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
              onClick={() => navigate('/search')}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        )}
      </div>

      {/* Right: Icons (only on home page) */}
      {isHomePage && (
        <div className="d-flex align-items-center gap-3 ms-auto">
          <i className="bi bi-bell fs-5"></i>
          <img
            src={profile}
            alt="profile"
            width="32"
            height="32"
            className="rounded-circle border border-light"
          />
        </div>
      )}

      {/* Right: Theme toggle button (always visible) */}
      <button
        className={`btn btn-sm ms-2 ${
          theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'
        }`}
        onClick={toggleTheme}
      >
        {theme === 'light' ? (
          <>
            <i className="bi bi-moon me-1"></i> Dark
          </>
        ) : (
          <>
            <i className="bi bi-sun me-1"></i> Light
          </>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
