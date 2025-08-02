import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Eye,
  CheckCircle,
  PauseCircle,
  XCircle,
  Clock,
  Users,
  Shield
} from 'lucide-react';

import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  const menuItems = [
    { name: 'Home', path: '/', icon: <Home /> },
    { name: 'Watching', path: '/watchlist/watching', icon: <Eye /> },
    { name: 'Completed', path: '/watchlist/completed', icon: <CheckCircle /> },
    { name: 'On Hold', path: '/watchlist/on-hold', icon: <PauseCircle /> },
    { name: 'Dropped', path: '/watchlist/dropped', icon: <XCircle /> },
    { name: 'Plan to Watch', path: '/watchlist/plan-to-watch', icon: <Clock /> },
    { name: 'Clubs', path: '/clubs', icon: <Users /> },
    { name: 'Admin Panel', path: '/admin', icon: <Shield /> }
  ];

  return (
    <>
      {/* Toggle Button when sidebar is hidden */}
      {!isOpen && (
        <button className="sidebar-toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {isOpen && (
        <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
          <div className="sidebar-header">
            <h2 className="sidebar-title">AniTrack</h2>
            <button className="sidebar-close" onClick={toggleSidebar}>✖</button>
          </div>
          <ul className="sidebar-menu">
            {menuItems.map((item, idx) => (
              <li key={idx} className={location.pathname === item.path ? 'active' : ''}>
                <Link to={item.path}>
                  <span className="icon">{item.icon}</span>
                  <span className="text">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
