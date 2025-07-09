// src/Components/Sidebar.jsx
import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebar, category }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const staticCategories = [
    { id: 0, label: 'Home', icon: 'bi-house-door-fill' },
    { id: 20, label: 'Gaming', icon: 'bi-controller' },
    { id: 2, label: 'Automobiles', icon: 'bi-car-front-fill' },
    { id: 17, label: 'Sports', icon: 'bi-trophy-fill' },
    { id: 24, label: 'Entertainment', icon: 'bi-camera-reels-fill' },
    { id: 28, label: 'Technology', icon: 'bi-cpu-fill' },
    { id: 10, label: 'Music', icon: 'bi-music-note-beamed' },
    { id: 22, label: 'Blogs', icon: 'bi-journal-text' },
    { id: 25, label: 'News', icon: 'bi-newspaper' },
  ];

  return (
    <div
      className={`p-2 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}
      style={{
        width: sidebar ? '240px' : '60px',
        height: '100vh',
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
      }}
    >
      {staticCategories.map((cat) => (
        <div
          key={cat.id}
          className={`d-flex align-items-center mb-3 p-2 rounded ${
            category === cat.id
              ? theme === 'dark'
                ? 'bg-secondary text-white'
                : 'bg-light text-dark'
              : ''
          }`}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(cat.id === 0 ? '/' : `/category/${cat.id}`)}
        >
          <i className={`bi ${cat.icon} me-2 ${!sidebar ? 'mx-auto' : ''}`}></i>
          {sidebar && <span>{cat.label}</span>}
        </div>
      ))}

      {sidebar && (
        <>
          <hr />
          <h6>Subscriptions</h6>
          <div className="align-items-center mb-2">
            <div className="d-flex mb-2 align-items-center">
              <i className="bi bi-music-note me-3 fs-5"></i>
              <p className="mb-0">Anand Audio</p>
            </div>
            <div className="d-flex mb-2 align-items-center">
              <i className="bi bi-journal-code me-3 fs-5"></i>
              <p className="mb-0">Unacademy</p>
            </div>
            <div className="d-flex mb-2 align-items-center">
              <i className="bi bi-terminal me-3 fs-5"></i>
              <p className="mb-0">DSA Coding</p>
            </div>
          </div>

          <hr />
          <p className={`small mt-4 p-2 ${theme === 'dark' ? 'text-light' : 'text-muted'}`}>
            About Press Copyright <br />
            Contact us Creators Advertise <br />
            Developers <br />
            <br />
            Terms Privacy Policy & Safety <br />
            How YouTube works <br />
            Test new features <br />
            @ 2025 MamathaTS
          </p>
        </>
      )}
    </div>
  );
};

export default Sidebar;
