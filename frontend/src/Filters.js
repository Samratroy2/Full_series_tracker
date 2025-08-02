// frontend/src/Filters.js
import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="filters-container" style={styles.container}>
      <select
        name="genre"
        value={filters.genre}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Horror">Horror</option>
        <option value="Romance">Romance</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Slice of Life">Slice of Life</option>
        <option value="Sports">Sports</option>
        {/* Add more genres if needed */}
      </select>

      <select
        name="year"
        value={filters.year}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">All Years</option>
        {/* You can dynamically generate years if you want */}
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2010s">2010-2019</option>
        <option value="2000s">2000-2009</option>
        <option value="90s">1990-1999</option>
      </select>

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">All Status</option>
        <option value="Watching">Watching</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
        <option value="Dropped">Dropped</option>
        <option value="Plan to Watch">Plan to Watch</option>
      </select>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  select: {
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    minWidth: '150px',
  },
};

export default Filters;
