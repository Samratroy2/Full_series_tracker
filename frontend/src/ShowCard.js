// frontend\src\ShowCard.js
import React from 'react';

const ShowCard = ({ show }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, margin: 16 }}>
      <h3>{show.title}</h3>
      <p>Total Episodes: {show.totalEpisodes}</p>
      <a href={show.streaming} target="_blank" rel="noopener noreferrer">
        <button>Watch on Streaming</button>
      </a>
    </div>
  );
};

export default ShowCard;
