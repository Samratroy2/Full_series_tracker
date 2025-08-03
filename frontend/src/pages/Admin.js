// frontend/src/pages/Admin.js

import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [clubs, setClubs] = useState([
    { id: 1, name: 'Attack on Titan Fans', members: 10 },
    { id: 2, name: 'Fantasy Lovers', members: 7 }
  ]);

  // Only admin can access
  if (!user || user.email !== 'trysamrat1@gmail.com') {
    return <Navigate to="/login" />;
  }

  // Fetch real users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/users?email=${user.email}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, [user.email]);

  const deleteUser = async (id) => {
    // Optional: Add delete request to backend
    setUsers(users.filter(user => user._id !== id));
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
          <p>No users found.</p>
        ) : (
          <ul className="admin-list">
            {users.map(user => (
              <li key={user._id} className="admin-item">
                <span><strong>{user.name || 'No Name'}</strong> ({user.email})</span>
                <button onClick={() => deleteUser(user._id)}>Remove</button>
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
