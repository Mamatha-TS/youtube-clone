import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayVideo from '../Components/PlayVideo';
import Recommended from '../Components/Recommended';
import Sidebar from '../Components/Sidebar';

const Video = ({ sidebar }) => {
  const { videoId } = useParams();
  const [category, setCategory] = useState(0); // For future sidebar category state

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar toggleable like in Home page */}
      <div style={{ flexShrink: 0 }}>
        <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      </div>

      {/* Main content */}
      <div className="flex-grow-1 overflow-auto px-3 py-3">
        <div className="row">
          <div className="col-lg-8 mb-4">
            <PlayVideo videoId={videoId} />
          </div>
          <div className="col-lg-4">
            <Recommended videoId={videoId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
