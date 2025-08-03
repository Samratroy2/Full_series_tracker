// src/contexts/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // Persist user on change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // ✅ Continue as Guest
  const continueAsGuest = () => {
    const guestUser = {
      name: 'Guest',
      email: 'guest@animeclub.com',
      role: 'guest',
    };
    setUser(guestUser);
    localStorage.setItem('user', JSON.stringify(guestUser));
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await res.json();
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ✅ Signup
  const signup = async (name, email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Signup failed');
      }

      const data = await res.json();
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // ✅ Export context
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        signup,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
