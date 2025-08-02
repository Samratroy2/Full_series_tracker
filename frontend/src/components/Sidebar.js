import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Home,
  Eye,
  CheckCircle,
  PauseCircle,
  XCircle,
  Clock,
  Users,
  Shield,
  LogOut,
  Menu
} from 'lucide-react';

import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => setIsOpen(prev => !prev);

  const menuItems = [
    { name: 'Home', path: '/', icon: <Home size={20} />, title: 'Home' },
    { name: 'Watching', path: '/watchlist/watching', icon: <Eye size={20} />, title: 'Watching' },
    { name: 'Completed', path: '/watchlist/completed', icon: <CheckCircle size={20} />, title: 'Completed' },
    { name: 'On Hold', path: '/watchlist/on-hold', icon: <PauseCircle size={20} />, title: 'On Hold' },
    { name: 'Dropped', path: '/watchlist/dropped', icon: <XCircle size={20} />, title: 'Dropped' },
    { name: 'Plan to Watch', path: '/watchlist/plan-to-watch', icon: <Clock size={20} />, title: 'Plan to Watch' },
    { name: 'Clubs', path: '/clubs', icon: <Users size={20} />, title: 'Clubs' },
    { name: 'Admin Panel', path: '/admin', icon: <Shield size={20} />, title: 'Admin Panel' }
  ];

  const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';
  const profileImage = user?.photo || defaultImage;

  return (
    <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-top">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <Menu size={22} />
        </button>

        <div className="sidebar-header">
          <div className={isOpen ? 'profile-wrapper' : 'profile-wrapper-collapsed'}>
            <div className="profile-circle">
              <img
                src={profileImage}
                alt="User"
                className="profile-image"
              />
            </div>
            {isOpen && user?.photo && <h2 className="sidebar-title">AniTrack</h2>}
          </div>
        </div>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            title={!isOpen ? item.title : ''}
          >
            <Link to={item.path}>
              <span className="icon">{item.icon}</span>
              {isOpen && <span className="text">{item.name}</span>}
            </Link>
          </li>
        ))}

        {/* Logout button styled same as menu items */}
        <li className="menu-item logout" title={!isOpen ? 'Logout' : ''}>
          <button className="logout-link" onClick={handleLogout}>
            <span className="icon"><LogOut size={20} /></span>
            {isOpen && <span className="text">Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
