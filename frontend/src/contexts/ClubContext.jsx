//frontend/src/contexts/ClubContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ClubContext = createContext();
export const useClubs = () => useContext(ClubContext);

const API = 'http://localhost:5000/api';

export const ClubProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchClubs();
  }, [user]);

  const fetchClubs = async () => {
    try {
      const res = await axios.get(`${API}/clubs`);
      setClubs(res.data);
    } catch (err) {
      console.error('Error loading clubs:', err);
    } finally {
      setLoading(false);
    }
  };

  const createClub = async (name) => {
    const res = await axios.post(`${API}/clubs`, {
      name,
      createdBy: user.email,
      members: [user.email],
    });
    setClubs((prev) => [...prev, res.data]);
  };

  const deleteClub = async (id) => {
    await axios.delete(`${API}/clubs/${id}`, {
      data: { email: user.email },
    });
    setClubs((prev) => prev.filter((club) => club._id !== id));
  };

  const joinClub = async (id) => {
    const res = await axios.post(`${API}/clubs/${id}/join`, {
      email: user.email,
    });
    setClubs((prev) =>
      prev.map((club) => (club._id === id ? res.data : club))
    );
  };

  const addMessage = async (id, text) => {
    const res = await axios.post(`${API}/clubs/${id}/message`, {
      user: user.email,
      text,
    });
    setClubs((prev) =>
      prev.map((club) => (club._id === id ? res.data : club))
    );
  };

  const addPoll = async (id, question, options) => {
    const res = await axios.post(`${API}/polls/${id}`, {
      question,
      options,
    });
    setClubs((prev) =>
      prev.map((club) => (club._id === id ? res.data : club))
    );
  };

  const votePoll = async (id, pollId, optionIndex) => {
    const res = await axios.post(`${API}/polls/${id}/vote`, {
      pollId,
      optionIndex,
      voter: user.email,
    });
    setClubs((prev) =>
      prev.map((club) => (club._id === id ? res.data : club))
    );
  };

  return (
    <ClubContext.Provider
      value={{
        clubs,
        loading,
        createClub,
        deleteClub,
        joinClub,
        addMessage,
        addPoll,
        votePoll,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};
