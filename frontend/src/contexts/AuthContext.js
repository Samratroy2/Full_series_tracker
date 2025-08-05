// src/contexts/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  // Sync user state with localStorage
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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // ✅ Signup
  const signup = async (name, email, password) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // ✅ Update User Profile
  const updateUser = async (updatedData) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', updatedData.name);
      formData.append('email', updatedData.email);
      formData.append('userId', updatedData.userId);
      formData.append('location', updatedData.location || '');
      if (updatedData.password) formData.append('password', updatedData.password);
      if (updatedData.profilePhoto instanceof File) {
        formData.append('profilePhoto', updatedData.profilePhoto);
      }

      const res = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUser(res.data);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        signup,
        continueAsGuest,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
