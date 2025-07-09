import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Feed from '../Components/Feed';

const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      </div>

      {/* Feed Section */}
      <div className="flex-grow-1 overflow-auto px-3">
        <Feed category={category} />
      </div>
    </div>
  );
};

export default Home;
