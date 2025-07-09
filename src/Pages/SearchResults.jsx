// src/Pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { API_KEY } from '../data';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { useTheme } from '../Context/ThemeContext';

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${API_KEY}`
        );
        const json = await res.json();
        setResults(json.items || []);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setResults([]);
      }
    };

    fetchSearch();
  }, [query]);

  return (
    <div className={`container mt-4 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
      <h4 className="mb-4">Search Results for "{query}"</h4>

      {results.length === 0 ? (
        <p className={`text-${theme === 'dark' ? 'light' : 'muted'}`}>No results found.</p>
      ) : (
        results.map((item, idx) => {
          const videoId = item.id.videoId;
          const snippet = item.snippet;

          return (
            <Link
              to={`/video/${snippet.categoryId || 0}/${videoId}`}
              key={idx}
              className={`text-decoration-none ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
            >
              <div className="card mb-3 border-0">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={snippet.thumbnails.medium.url}
                      className="img-fluid rounded-start"
                      alt={snippet.title}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{snippet.title}</h5>
                      <p className="card-text mb-1">{snippet.channelTitle}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {moment(snippet.publishedAt).fromNow()}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default SearchResults;
