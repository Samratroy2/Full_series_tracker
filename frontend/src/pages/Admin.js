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
    { id: 2, name: 'Fantasy Lovers', members: 7 },
  ]);

  const isAdmin = user?.email === 'trysamrat1@gmail.com';

  // Restrict access
  if (!user || !isAdmin) return <Navigate to="/login" />;

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/users?email=${user.email}`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user.email]);

  // Delete user from DB
  const deleteUser = async (id, email) => {
    if (email === 'trysamrat1@gmail.com') {
      alert("You can't delete the admin!");
      return;
    }

    const confirm = window.confirm(`Delete user ${email} and all data?`);
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/auth/users/${id}?adminEmail=${user.email}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Deletion failed');
      }

      alert(`User ${email} deleted`);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error('Failed to delete user:', err.message);
      alert('Error deleting user.');
    }
  };

  // Delete club (static data)
  const deleteClub = (id) => {
    const confirm = window.confirm('Delete this club?');
    if (confirm) {
      setClubs(prev => prev.filter(club => club.id !== id));
    }
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
                <span>
                  <strong>{user.name || 'No Name'}</strong> ({user.email})
                </span>
                {user.email !== 'trysamrat1@gmail.com' && (
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user._id, user.email)}
                  >
                    Remove
                  </button>
                )}
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
                <span>
                  <strong>{club.name}</strong> - {club.members} members
                </span>
                <button className="delete-btn" onClick={() => deleteClub(club.id)}>
                  Delete Club
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
