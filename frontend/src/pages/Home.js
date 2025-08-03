import React, { useEffect, useState } from 'react';
import './Home.css';
import { useTheme } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');
  const [showWelcome, setShowWelcome] = useState(false); // 👈 new state

  useEffect(() => {
    const user = localStorage.getItem('user');
    const justLoggedIn = sessionStorage.getItem('justLoggedIn'); // 👈

    if (!user) {
      navigate('/login');
    } else if (justLoggedIn) {
      setShowWelcome(true);
      sessionStorage.removeItem('justLoggedIn'); // 👈 Only once
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/anime')
      .then((res) => res.json())
      .then((data) => {
        setAnimeList(data);
        setFilteredAnime(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const genres = ['All', ...new Set(animeList.map((anime) => anime.genre))];

  useEffect(() => {
    let filtered = animeList;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (anime) =>
          anime.title.toLowerCase().includes(q) ||
          anime.genre.toLowerCase().includes(q) ||
          anime.year?.toString().includes(q)
      );
    }

    if (genreFilter !== 'All') {
      filtered = filtered.filter((anime) => anime.genre === genreFilter);
    }

    setFilteredAnime(filtered);
  }, [searchQuery, genreFilter, animeList]);

  return (
    <div className={`home ${theme}`}>
      {showWelcome && (
        <div className="welcome-popup">
          <h1>Welcome to Series Tracker</h1>
          <p>Track and discover your favorite series!</p>
        </div>
      )}

      <div className="home-section">
        <div className="search-filter-bar">
          <input
            type="text"
            placeholder="Search by title, genre or year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {(searchQuery || genreFilter !== 'All') && (
            <button onClick={() => {
              setSearchQuery('');
              setGenreFilter('All');
            }}>
              Clear
            </button>
          )}
        </div>

        <h2>All Anime</h2>

        {filteredAnime.length === 0 ? (
          <p>No anime found.</p>
        ) : (
          <div className="scroll-container">
            {filteredAnime.map((anime) => (
              <div className="anime-card" key={anime._id}>
                <img
                  src={anime.image || anime.images?.jpg?.image_url}
                  alt={anime.title}
                  className="anime-image"
                />
                <div className="anime-details">
                  <h3>{anime.title}</h3>
                  <p><strong>Episodes:</strong> {anime.episodes}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
