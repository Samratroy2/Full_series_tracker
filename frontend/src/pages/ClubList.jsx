// frontend\src\pages\ClubList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClubs } from '../contexts/ClubContext';
import './ClubList.css';

const ClubList = () => {
  const { clubs, createClub, deleteClub } = useClubs();
  const navigate = useNavigate();
  const [newClubName, setNewClubName] = useState('');

  const handleCreateClub = () => {
    if (newClubName.trim() !== '') {
      createClub(newClubName.trim());
      setNewClubName('');
    }
  };

  return (
    <div className="club-messenger-layout">
      <div className="club-sidebar">
        <div className="club-sidebar-header">Clubs</div>
        <div className="club-create">
          <input
            type="text"
            placeholder="New club name..."
            value={newClubName}
            onChange={(e) => setNewClubName(e.target.value)}
          />
          <button onClick={handleCreateClub}>Create</button>
        </div>
        <div className="club-list">
          {clubs.map((club) => (
            <div key={club.id} className="club-item">
              <div className="club-name" onClick={() => navigate(`/club/${club.id}`)}>
                {club.name}
              </div>
              <button className="delete-btn" onClick={() => deleteClub(club.id)}>✖</button>
            </div>
          ))}
        </div>
      </div>

      <div className="club-content">
        <p>Select a club to view details</p>
      </div>
    </div>
  );
};

export default ClubList;
