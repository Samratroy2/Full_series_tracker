//frontend\src\pages\Watching.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Watching = () => {
  const [watchingList, setWatchingList] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('watchingList')) || [];
    setWatchingList(storedList);
  }, []);

  const updateEpisodeCount = (id, change) => {
    const updatedList = watchingList.map(anime => {
      if (anime.mal_id === id) {
        let newCount = (anime.episodesWatched || 0) + change;
        newCount = Math.max(0, Math.min(newCount, anime.episodes || 100)); // Clamp between 0 and total
        return { ...anime, episodesWatched: newCount };
      }
      return anime;
    });
    localStorage.setItem('watchingList', JSON.stringify(updatedList));
    setWatchingList(updatedList);
  };

  const moveToList = (anime, targetListName) => {
    const updatedWatchingList = watchingList.filter(item => item.mal_id !== anime.mal_id);
    localStorage.setItem('watchingList', JSON.stringify(updatedWatchingList));

    const targetList = JSON.parse(localStorage.getItem(targetListName)) || [];
    targetList.push(anime);
    localStorage.setItem(targetListName, JSON.stringify(targetList));

    setWatchingList(updatedWatchingList);
  };

  const handleRemove = (animeId) => {
    const updatedList = watchingList.filter(item => item.mal_id !== animeId);
    localStorage.setItem('watchingList', JSON.stringify(updatedList));
    setWatchingList(updatedList);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📺 Watching</h2>
      {watchingList.length === 0 ? (
        <p>You are not watching anything currently.</p>
      ) : (
        <div className="anime-grid">
          {watchingList.map((anime) => (
            <div key={anime.mal_id} className="anime-card">
              <Link to={`/anime/${anime.mal_id}`}>
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Link>
              <h4>{anime.title}</h4>

              {/* Episode Tracker */}
              <div style={{ margin: '5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => updateEpisodeCount(anime.mal_id, -1)} style={roundBtn}>−</button>
                <span>Ep: {anime.episodesWatched || 0} / {anime.episodes || '?'}</span>
                <button onClick={() => updateEpisodeCount(anime.mal_id, 1)} style={roundBtn}>＋</button>
              </div>

              {/* Status Buttons */}
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {(anime.episodesWatched > 0 && anime.episodesWatched < anime.episodes) && (
                  <>
                    <button onClick={() => moveToList(anime, 'onHoldList')} style={btnStyle}>📌 Mark as On Hold</button>
                    <button onClick={() => moveToList(anime, 'droppedList')} style={{ ...btnStyle, backgroundColor: '#e74c3c' }}>📉 Mark as Dropped</button>
                  </>
                )}
                <button onClick={() => handleRemove(anime.mal_id)} style={{ ...btnStyle, backgroundColor: '#7f8c8d' }}>🗑️ Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const btnStyle = {
  padding: '6px 10px',
  fontSize: '13px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#3498db',
  color: '#fff',
  cursor: 'pointer'
};

const roundBtn = {
  ...btnStyle,
  fontSize: '16px',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default Watching;
