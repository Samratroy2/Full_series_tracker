// frontend\src\SharedWatchlist.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SharedWatchlist = () => {
  const { userId } = useParams();
  const [watchlist, setWatchlist] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch(\`http://localhost:5000/api/users/\${userId}/watchlist\`)
      .then(res => res.json())
      .then(data => setWatchlist(data));
  }, [userId]);

  useEffect(() => {
    fetch("http://localhost:5000/api/shows")
      .then(res => res.json())
      .then(data => setShows(data));
  }, []);

  const userShows = shows.filter(show => watchlist.includes(show.id));

  return (
    <div>
      <h2>Shared Watchlist</h2>
      <ul>
        {userShows.map(show => (
          <li key={show.id}>
            {show.title} — <a href={show.streaming} target="_blank" rel="noreferrer">Watch</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedWatchlist;
