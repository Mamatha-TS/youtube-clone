import React from 'react';
import '../SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-thumbnail"></div>
      <div className="skeleton-line short"></div>
      <div className="skeleton-line"></div>
    </div>
  );
};

export default SkeletonLoader;
