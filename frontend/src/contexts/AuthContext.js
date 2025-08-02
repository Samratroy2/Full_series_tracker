// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(() => {
    // Load users from localStorage if available
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [{ name: 'Test User', email: 'test@example.com', password: '123456' }];
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    const existingUser = users.find(
      u => u.email === email && u.password === password
    );
    if (existingUser) {
      setUser({ name: existingUser.name, email: existingUser.email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (name, email, password) => {
    const exists = users.find(u => u.email === email);
    if (exists) return false;

    const newUser = { name, email, password };
    setUsers(prev => [...prev, newUser]);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
