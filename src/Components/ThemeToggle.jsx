import React from 'react';
import { useTheme } from '../Context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`btn btn-sm ms-3 ${
        theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'
      }`}
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
    </button>
  );
};

export default ThemeToggle;
