// frontend/src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import { ThemeProvider, useTheme } from './ThemeContext';
import { ClubProvider } from './contexts/ClubContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

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

import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

const AppLayout = () => {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { darkMode, toggleTheme } = useTheme();
  const { user } = useAuth();

  const noSidebarRoutes = ['/login', '/register'];

  const showSidebar = sidebarVisible && !noSidebarRoutes.includes(location.pathname);

  const containerStyle = {
    flex: 1,
    padding: '1rem',
    position: 'relative',
    backgroundColor: darkMode ? '#121212' : '#ffffff',
    color: darkMode ? '#e0e0e0' : '#000000',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
  };

  return (
    <div
      className="app-container"
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: darkMode ? '#000' : '#f5f5f5',
        transition: 'background-color 0.3s ease',
      }}
    >
      {showSidebar && <Sidebar />}

      <div style={containerStyle}>
        {/* Theme Toggle Button */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            borderRadius: '5px',
            backgroundColor: darkMode ? '#444' : '#ccc',
            border: 'none',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />

          {/* Protected Routes */}
          {user ? (
            <>
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/watchlist/watching" element={<Watching />} />
              <Route path="/watchlist/completed" element={<Completed />} />
              <Route path="/watchlist/on-hold" element={<OnHold />} />
              <Route path="/watchlist/dropped" element={<Dropped />} />
              <Route path="/watchlist/plan-to-watch" element={<PlanToWatch />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/clubs" element={<ClubList />} />
              <Route path="/clubs/create" element={<CreateClub />} />
              <Route path="/club/:id" element={<ClubPage />} />
            </>
          ) : (
            <>
              <Route path="/watchlist/*" element={<Navigate to="/login" />} />
              <Route path="/clubs/*" element={<Navigate to="/login" />} />
              <Route path="/admin" element={<Navigate to="/login" />} />
            </>
          )}

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
