import React, { useEffect, useState } from 'react';
import { API_KEY, value_converter } from '../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';

const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const { theme } = useTheme();

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    const fetchVideoData = async () => {
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      const video = data.items?.[0];
      setApiData(video);
      setLikeCount(parseInt(video.statistics.likeCount));
      setDislikeCount(parseInt(video.statistics.dislikeCount || 0));
    };
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    const fetchOtherData = async () => {
      if (!apiData?.snippet?.channelId) return;
      const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const res = await fetch(channelUrl);
      const json = await res.json();
      setChannelData(json.items?.[0]);

      const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`;
      const commentRes = await fetch(commentUrl);
      const commentJson = await commentRes.json();
      setCommentData(commentJson.items || []);
    };
    if (apiData) fetchOtherData();
  }, [apiData]);

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      setDisliked(false);
      setLikeCount(likeCount + 1);
      if (disliked) setDislikeCount(dislikeCount - 1);
    } else {
      setLikeCount(likeCount - 1);
    }
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (!disliked) {
      setLiked(false);
      setDislikeCount(dislikeCount + 1);
      if (liked) setLikeCount(likeCount - 1);
    } else {
      setDislikeCount(dislikeCount - 1);
    }
  };

  return (
    <div className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
      <div className="video-page container mt-4">
        <div className="ratio ratio-16x9 mb-3">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px',
            }}
          />
        </div>

        <h5>{apiData?.snippet.title}</h5>
        <p className={theme === 'dark' ? 'text-light' : 'text-muted'}>
          {value_converter(apiData?.statistics.viewCount)} views •{' '}
          {moment(apiData?.snippet.publishedAt).fromNow()}
        </p>

        <div className="d-flex gap-3 my-2 flex-wrap">
          <span
            className={`d-flex align-items-center react-button ${liked ? 'active-like' : ''}`}
            onClick={handleLike}
            role="button"
          >
            <i className="bi bi-hand-thumbs-up me-1"></i> {value_converter(likeCount)}
          </span>

          <span
            className={`d-flex align-items-center react-button ${disliked ? 'active-dislike' : ''}`}
            onClick={handleDislike}
            role="button"
          >
            <i className="bi bi-hand-thumbs-down me-1"></i> {value_converter(dislikeCount)}
          </span>

          <span className="d-flex align-items-center react-button" role="button">
            <i className="bi bi-share me-1"></i> Share
          </span>

          <span className="d-flex align-items-center react-button" role="button">
            <i className="bi bi-bookmark me-1"></i> Save
          </span>
        </div>

        <hr />

        <div className="d-flex align-items-center mb-3">
          <img
            src={channelData?.snippet.thumbnails.default.url}
            alt="channel"
            className="rounded-circle me-2"
            width="48"
            height="48"
          />
          <div className="flex-grow-1">
            <strong>{apiData?.snippet.channelTitle}</strong>
            <br />
            <small className={theme === 'dark' ? 'text-light' : 'text-muted'}>
              {value_converter(channelData?.statistics.subscriberCount)} subscribers
            </small>
          </div>
          <button className="btn btn-danger btn-sm">Subscribe</button>
        </div>

        <p className={theme === 'dark' ? 'text-light' : 'text-muted'}>
          {apiData?.snippet.description.slice(0, 250)}
        </p>

        <hr />
        <h6>{value_converter(apiData?.statistics.commentCount)} Comments</h6>

        {commentData.length > 0 ? (
          <>
            {(showAllComments ? commentData : commentData.slice(0, 3)).map((comment, index) => (
              <div key={index} className="d-flex align-items-start mb-3">
                <img
                  src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                  alt="commenter"
                  width="40"
                  height="40"
                  className="rounded-circle me-2"
                />
                <div>
                  <p className="mb-1 fw-semibold">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </p>
                  <p className={`mb-1 ${theme === 'dark' ? 'text-light' : 'text-muted'}`}>
                    {comment.snippet.topLevelComment.snippet.textDisplay}
                  </p>
                  <p className={`small ${theme === 'dark' ? 'text-light' : 'text-muted'}`}>
                    {moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}
                  </p>
                </div>
              </div>
            ))}

            {commentData.length > 3 && (
              <button
                className={`btn btn-sm mt-2 ${
                  theme === 'dark' ? 'btn-outline-light' : 'btn-outline-secondary'
                }`}
                onClick={() => setShowAllComments(!showAllComments)}
              >
                {showAllComments ? '▲ Show Less' : '▼ Show More'}
              </button>
            )}
          </>
        ) : (
          <p className={theme === 'dark' ? 'text-light' : 'text-muted'}>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PlayVideo;
