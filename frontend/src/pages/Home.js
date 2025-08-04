// frontend/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import './Home.css';
import { useTheme } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:5000/api/anime')
      .then((res) => res.json())
      .then((data) => setAnimeList(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={`home ${theme}`}>
      <div className="home-section">
        <AnimeSection title="Top Anime" data={animeList.filter(a => a.type === 'Anime')} />
        <AnimeSection title="Serials" data={animeList.filter(a => a.type === 'Serial')} />
        <AnimeSection title="New Releases" data={animeList.filter(a => a.year >= 2023)} />
        <AnimeSection title="Popular in Action Genre" data={animeList.filter(a => a.genre === 'Action')} />
      </div>
    </div>
  );
};

const AnimeSection = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="section-block">
      <h2 className="section-title">{title}</h2>
      <div className="scroll-container">
        {data.map((anime) => {
          const imageUrl = anime.image || anime.images?.jpg?.image_url || 'https://via.placeholder.com/220x320?text=No+Image';
          return (
            <div className="anime-card" key={anime._id}>
              <img className="anime-image" src={imageUrl} alt={anime.title} />
              <div className="anime-info">
                <h3>{anime.title}</h3>
                <p>Episodes: {anime.episodes}</p>
                <p>Rating: {anime.score || 'N/A'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
