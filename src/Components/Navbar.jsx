import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import logo from '../Assets/logo.png';
import profile from '../Assets/profile.jpg';

const Navbar = ({ setSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg px-3 py-2 shadow-sm sticky-top ${
        theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
      }`}
    >
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

      <form className="d-flex mx-auto w-50" onSubmit={handleSubmit}>
        <input
          className={`form-control rounded-0 rounded-start ${
            theme === 'dark' ? 'bg-secondary text-white border-0' : ''
          }`}
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search"
        />
        <button
          className={`btn rounded-0 rounded-end ${
            theme === 'dark' ? 'btn-secondary' : 'btn-outline-secondary'
          }`}
          type="submit"
          aria-label="Search button"
        >
          <i className="bi bi-search"></i>
        </button>
      </form>

      <div className="d-flex align-items-center gap-3 ms-auto">
        <i className="bi bi-bell fs-5"></i>
        <img
          src={profile}
          alt="profile"
          width="32"
          height="32"
          className="rounded-circle border border-light"
        />
        <button
          className={`btn btn-sm ms-2 ${
            theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'
          }`}
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <>
              <i className="bi bi-moon me-1"></i> Dark Mode
            </>
          ) : (
            <>
              <i className="bi bi-sun me-1"></i> Light Mode
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
