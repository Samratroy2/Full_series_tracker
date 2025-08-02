// frontend\src\pages\Dropped.js
import React, { useEffect, useState } from 'react';

const Dropped = () => {
  const [droppedList, setDroppedList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('droppedList')) || [];
    setDroppedList(stored);
  }, []);

  const handleRemove = (id) => {
    const updated = droppedList.filter(item => item.mal_id !== id);
    setDroppedList(updated);
    localStorage.setItem('droppedList', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Dropped List</h2>
      {droppedList.length === 0 ? (
        <p>No anime dropped.</p>
      ) : (
        droppedList.map(anime => (
          <div key={anime.mal_id} style={cardStyle}>
            <img src={anime.images?.jpg?.image_url} alt={anime.title} style={{ width: '80px' }} />
            <div style={{ marginLeft: '1rem' }}>
              <h4>{anime.title}</h4>
              <p>Episodes Watched: {anime.episodesWatched}</p>
              <button onClick={() => handleRemove(anime.mal_id)} style={btnStyle}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
  padding: '1rem',
  background: '#f0f0f0',
  borderRadius: '10px'
};

const btnStyle = {
  marginTop: '0.5rem',
  padding: '6px 12px',
  backgroundColor: '#cc0000',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Dropped;
