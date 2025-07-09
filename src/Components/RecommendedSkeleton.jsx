import React from 'react';

const RecommendedSkeleton = () => {
  return (
    <div
      className="d-flex mb-3 animate-pulse"
      role="status"
      aria-label="Loading recommended video"
    >
      {/* Thumbnail skeleton */}
      <div
        className="me-2 bg-secondary bg-opacity-10"
        style={{
          width: '168px',
          height: '94px',
          borderRadius: '6px',
        }}
      ></div>

      {/* Text skeletons */}
      <div style={{ flex: 1 }}>
        <div
          className="bg-secondary bg-opacity-10 rounded mb-2"
          style={{ height: '14px', width: '100%' }}
        ></div>
        <div
          className="bg-secondary bg-opacity-10 rounded mb-1"
          style={{ height: '12px', width: '70%' }}
        ></div>
        <div
          className="bg-secondary bg-opacity-10 rounded"
          style={{ height: '10px', width: '40%' }}
        ></div>
      </div>
    </div>
  );
};

export default RecommendedSkeleton;
