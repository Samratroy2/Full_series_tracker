// src/contexts/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem('users');
    return stored
      ? JSON.parse(stored)
      : [{ name: 'Test User', email: 'test@example.com', password: '123456' }];
  });

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Done loading
  }, []);

  // Persist users list on change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Persist user on change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email, password) => {
    const existingUser = users.find(
      u => u.email === email && u.password === password
    );
    if (existingUser) {
      const loggedInUser = { name: existingUser.name, email: existingUser.email };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = (name, email, password) => {
    const exists = users.find(u => u.email === email);
    if (exists) return false;

    const newUser = { name, email, password };
    setUsers(prev => [...prev, newUser]);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
