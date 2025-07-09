// src/Components/Feed.jsx
import React, { useEffect, useState } from 'react';
import { API_KEY, value_converter } from '../data';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SkeletonLoader from './SkeletonLoader';
import { useTheme } from '../Context/ThemeContext';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=48&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
        const res = await fetch(url);
        const json = await res.json();
        setData(json.items || []);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="row gx-3">
      {(loading ? [...Array(12)] : data).map((item, index) => (
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={index}>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <Link
              to={`/video/${item.snippet.categoryId}/${item.id}`}
              className={`text-decoration-none ${theme === 'dark' ? 'text-light' : 'text-dark'}`}
            >
              <div className="card video-card border-0 shadow-sm h-100">
                <div className="thumbnail-wrapper">
                  <img
                    src={item.snippet.thumbnails.high.url}
                    className="card-img-top"
                    alt={item.snippet.title}
                    loading="lazy"
                  />
                </div>
                <div className="card-body px-2 py-2">
                  <h6
                    className="card-title mb-1"
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={item.snippet.title}
                  >
                    {item.snippet.title}
                  </h6>
                  <p className="card-text mb-0 small text-muted">
                    {item.snippet.channelTitle}
                  </p>
                  <p className="card-text small text-muted">
                    {value_converter(item.statistics.viewCount)} views •{' '}
                    {moment(item.snippet.publishedAt).fromNow()}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Feed;
