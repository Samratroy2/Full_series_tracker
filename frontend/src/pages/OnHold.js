// frontend\src\pages\OnHold.js

import React, { useEffect, useState } from 'react';

const OnHold = () => {
  const [onHoldList, setOnHoldList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('onHoldList')) || [];
    setOnHoldList(stored);
  }, []);

  const handleRemove = (id) => {
    const updated = onHoldList.filter(item => item.mal_id !== id);
    setOnHoldList(updated);
    localStorage.setItem('onHoldList', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>On Hold List</h2>
      {onHoldList.length === 0 ? (
        <p>No anime on hold.</p>
      ) : (
        onHoldList.map(anime => (
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

export default OnHold;
