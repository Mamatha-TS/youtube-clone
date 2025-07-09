// App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Video from './Pages/Video';
import SearchResults from './Pages/SearchResults';
import { ThemeProvider } from './Context/ThemeContext';
import ScrollToTop from './utils/ScrollToTop' 

const App = () => {
  const [sidebar, setSidebar] = useState(true); // App-wide sidebar toggle

  return (
    <ThemeProvider>
      <ScrollToTop />
      <Navbar setSidebar={setSidebar} />
      <main>
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar} />} />
          <Route path="/video/:categoryId/:videoId" element={<Video sidebar={sidebar} />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
};

export default App;
