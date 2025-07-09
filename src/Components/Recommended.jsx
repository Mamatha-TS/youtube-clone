import React, { useEffect, useState } from 'react';
import { API_KEY, value_converter } from '../data';
import moment from 'moment';
import { Link } from 'react-router-dom';
import RecommendedSkeleton from './RecommendedSkeleton';
import { useTheme } from '../Context/ThemeContext';

const Recommended = ({ videoId }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchRecommended = async () => {
      setLoading(true);
      try {
        const videoRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
        );
        const videoData = await videoRes.json();
        const videoInfo = videoData.items?.[0];
        if (!videoInfo) {
          setApiData([]);
          setLoading(false);
          return;
        }

        const { channelId, categoryId } = videoInfo.snippet;

        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&type=video&key=${API_KEY}`
        );
        const searchData = await searchRes.json();
        const videoIds = (searchData.items || [])
          .map((item) => item.id.videoId)
          .filter(Boolean);

        const statsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(',')}&key=${API_KEY}`
        );
        const statsData = await statsRes.json();

        const popularRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&videoCategoryId=${categoryId}&maxResults=10&key=${API_KEY}`
        );
        const popularData = await popularRes.json();

        const allVideos = [...(statsData.items || []), ...(popularData.items || [])];
        const filtered = allVideos.filter((item) => (item.id.videoId || item.id) !== videoId);

        setApiData(filtered);
      } catch (err) {
        console.error(err);
        setApiData([]);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) fetchRecommended();
  }, [videoId]);

  return (
    <div className={`p-2 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
      <h5 className="mb-3">Recommended</h5>

      {loading ? (
        [...Array(6)].map((_, i) => <RecommendedSkeleton key={i} />)
      ) : apiData.length === 0 ? (
        <p className={`${theme === 'dark' ? 'text-light' : 'text-muted'}`}>No recommendations found.</p>
      ) : (
        apiData.map((item, index) => {
          const vid = item.id.videoId || item.id;
          const snippet = item.snippet;
          const views = item.statistics?.viewCount
            ? `${value_converter(item.statistics.viewCount)} views`
            : '';
          const timeAgo = moment(snippet.publishedAt).fromNow();

          return (
            <Link
              key={index}
              to={`/video/0/${vid}`}
              className={`text-decoration-none ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="d-flex mb-3" role="button">
                <img
                  src={snippet.thumbnails.medium.url}
                  alt={snippet.title}
                  loading="lazy"
                  className="me-2"
                  style={{
                    width: '168px',
                    height: '94px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h6
                    className="mb-1"
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal',
                    }}
                    title={snippet.title}
                  >
                    {snippet.title}
                  </h6>

                  <p className={`mb-0 small ${theme === 'dark' ? 'text-light' : 'text-muted'}`}>
                    {snippet.channelTitle}
                  </p>

                  <p className={`mb-0 small ${theme === 'dark' ? 'text-light' : 'text-muted'}`}>
                    {views && `${views} • ${timeAgo}`}
                    {!views && timeAgo}
                  </p>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Recommended;
