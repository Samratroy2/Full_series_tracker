//frontend\src\pages\Admin.js

import React, { useState } from 'react';
import './AdminPanel.css'; // keeping external CSS for clean styles

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin", email: "admin@example.com" },
    { id: 2, name: "User1", email: "user1@example.com" }
  ]);

  const [clubs, setClubs] = useState([
    { id: 1, name: "Attack on Titan Fans", members: 10 },
    { id: 2, name: "Fantasy Lovers", members: 7 }
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const deleteClub = (id) => {
    setClubs(clubs.filter(club => club.id !== id));
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <section>
        <h2>Users</h2>
        {users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          <ul className="admin-list">
            {users.map(user => (
              <li key={user.id} className="admin-item">
                <span><strong>{user.name}</strong> ({user.email})</span>
                <button onClick={() => deleteUser(user.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Clubs</h2>
        {clubs.length === 0 ? (
          <p>No clubs available.</p>
        ) : (
          <ul className="admin-list">
            {clubs.map(club => (
              <li key={club.id} className="admin-item">
                <span><strong>{club.name}</strong> - {club.members} members</span>
                <button onClick={() => deleteClub(club.id)}>Delete Club</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
