// frontend\src\pages\AnimeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AnimeDetails.css';

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/shows/${id}`);
        const data = await res.json();
        setAnime(data);
      } catch (err) {
        console.error('Error fetching anime:', err);
      }
    };

    fetchAnime();
  }, [id]);

  if (!anime) return <div className="details-loading">Loading...</div>;

  return (
    <div className="anime-details">
      <img src={anime.image} alt={anime.title} className="anime-image" />
      <div className="anime-info">
        <h2>{anime.title}</h2>
        <p><strong>Episodes:</strong> {anime.totalEpisodes}</p>
        <p><strong>Description:</strong> {anime.description}</p>
        <p><strong>Genres:</strong> {anime.genres.join(', ')}</p>
        <p><strong>Status:</strong> {anime.status || 'Not Started'}</p>
      </div>
    </div>
  );
};

export default AnimeDetails;
