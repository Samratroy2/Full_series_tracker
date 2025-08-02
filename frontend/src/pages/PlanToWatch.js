// C:\Users\SAMRAT ROY\Downloads\anime-tracker\frontend\src\pages\PlanToWatch.js
import React, { useEffect, useState } from 'react';

const PlanToWatch = () => {
  const [planList, setPlanList] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('planToWatchList')) || [];
    setPlanList(storedList);
  }, []);

  const removeFromPlanToWatch = (mal_id) => {
    const updatedList = planList.filter(anime => anime.mal_id !== mal_id);
    localStorage.setItem('planToWatchList', JSON.stringify(updatedList));
    setPlanList(updatedList);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📌 Plan to Watch List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {planList.map((anime) => (
          <div key={anime.mal_id} style={{ width: '200px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
            <img src={anime.images?.jpg?.image_url} alt={anime.title} style={{ width: '100%' }} />
            <h4 style={{ marginTop: '0.5rem' }}>{anime.title}</h4>
            <p><strong>Episodes Watched:</strong> {anime.episodesWatched}</p>
            <p><strong>Total:</strong> {anime.episodes}</p>
            <button
              onClick={() => removeFromPlanToWatch(anime.mal_id)}
              style={{
                marginTop: '0.5rem',
                background: 'red',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🗑 Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanToWatch;
