// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import { ThemeProvider, useTheme } from './ThemeContext';
import { ClubProvider } from './contexts/ClubContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import FilterPage from './pages/FilterPage';

import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Watching from './pages/Watching';
import Completed from './pages/Completed';
import OnHold from './pages/OnHold';
import Dropped from './pages/Dropped';
import PlanToWatch from './pages/PlanToWatch';
import Admin from './pages/Admin';
import AnimeDetails from './pages/AnimeDetails';
import ClubList from './pages/ClubList';
import ClubPage from './pages/ClubPage';
import CreateClub from './pages/CreateClub';
import AdminRoute from './components/AdminRoute';

import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

const AppLayout = () => {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { darkMode, toggleTheme } = useTheme();
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  const noSidebarRoutes = ['/login', '/register', '/forgot-password', '/verify-otp', '/reset-password'];
  const showSidebar = sidebarVisible && !noSidebarRoutes.includes(location.pathname);

  const containerStyle = {
    flex: 1,
    padding: '1rem',
    position: 'relative',
    backgroundColor: darkMode ? '#000000' : '#ffffff',
    color: darkMode ? '#F14A00' : '#000000',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
  };

  const isAuthenticated = !!user;

  return (
    <div
      className="app-container"
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: darkMode ? '#000000' : '#f5f5f5',
        transition: 'background-color 0.3s ease',
      }}
    >
      {showSidebar && <Sidebar />}

      <div style={containerStyle}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            borderRadius: '8px',
            background: darkMode ? '#500073' : '#cccccc',
            color: darkMode ? '#ffffff' : '#000000',
            border: 'none',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: darkMode
              ? '0 0 10px #4B4376'
              : '0 0 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/anime/:id" element={isAuthenticated ? <AnimeDetails /> : <Navigate to="/login" />} />
          <Route path="/watchlist" element={isAuthenticated ? <Watchlist /> : <Navigate to="/login" />} />
          <Route path="/watchlist/watching" element={isAuthenticated ? <Watching /> : <Navigate to="/login" />} />
          <Route path="/watchlist/completed" element={isAuthenticated ? <Completed /> : <Navigate to="/login" />} />
          <Route path="/watchlist/on-hold" element={isAuthenticated ? <OnHold /> : <Navigate to="/login" />} />
          <Route path="/watchlist/dropped" element={isAuthenticated ? <Dropped /> : <Navigate to="/login" />} />
          <Route path="/watchlist/plan-to-watch" element={isAuthenticated ? <PlanToWatch /> : <Navigate to="/login" />} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/clubs" element={isAuthenticated ? <ClubList /> : <Navigate to="/login" />} />
          <Route path="/clubs/create" element={isAuthenticated ? <CreateClub /> : <Navigate to="/login" />} />
          <Route path="/club/:id" element={isAuthenticated ? <ClubPage /> : <Navigate to="/login" />} />
          <Route path="/filter" element={<FilterPage />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <ThemeProvider>
      <AuthProvider>
        <ClubProvider>
          <AppLayout />
        </ClubProvider>
      </AuthProvider>
    </ThemeProvider>
  </Router>
);

export default App;
