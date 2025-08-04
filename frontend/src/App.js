import React from 'react';
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
import Search from './pages/Search';

import './App.css';

const AppLayout = () => {
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();
  const { user, loading } = useAuth();

  const noSidebarRoutes = ['/login', '/register', '/forgot-password', '/verify-otp', '/reset-password'];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  React.useEffect(() => {
    document.body.classList.toggle('dark-theme', darkMode);
  }, [darkMode]);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  const isAuthenticated = !!user;

  return (
    <div className="app-container">
      {showSidebar && <Sidebar />}

      <div className="main-content">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Public */}
          <Route path="/filter" element={<FilterPage />} />

          {/* Protected */}
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/anime/:id" element={isAuthenticated ? <AnimeDetails /> : <Navigate to="/login" />} />
          <Route path="/watchlist" element={isAuthenticated ? <Watchlist /> : <Navigate to="/login" />} />
          <Route path="/watchlist/watching" element={isAuthenticated ? <Watching /> : <Navigate to="/login" />} />
          <Route path="/watchlist/completed" element={isAuthenticated ? <Completed /> : <Navigate to="/login" />} />
          <Route path="/watchlist/on-hold" element={isAuthenticated ? <OnHold /> : <Navigate to="/login" />} />
          <Route path="/watchlist/dropped" element={isAuthenticated ? <Dropped /> : <Navigate to="/login" />} />
          <Route path="/watchlist/plan-to-watch" element={isAuthenticated ? <PlanToWatch /> : <Navigate to="/login" />} />
          <Route path="/clubs" element={isAuthenticated ? <ClubList /> : <Navigate to="/login" />} />
          <Route path="/clubs/create" element={isAuthenticated ? <CreateClub /> : <Navigate to="/login" />} />
          <Route path="/club/:id" element={isAuthenticated ? <ClubPage /> : <Navigate to="/login" />} />
          <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
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
