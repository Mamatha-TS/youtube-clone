// src/Pages/CategoryPage.jsx
import React from 'react';
import Sidebar from '../Components/Sidebar';
import Feed from '../Components/Feed';
import { useParams } from 'react-router-dom';

const CategoryPage = ({ sidebar }) => {
  const { categoryId } = useParams();

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <div style={{ flexShrink: 0 }}>
        <Sidebar sidebar={sidebar} category={+categoryId} />
      </div>
      <div className="flex-grow-1 overflow-auto px-3">
        <Feed category={+categoryId} />
      </div>
    </div>
  );
};

export default CategoryPage;
