// src/pages/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const { login, continueAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      alert('✅ Login successful');
      navigate('/'); // home or dashboard
    } else {
      alert(`❌ ${result.message}`);
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate('/');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="auth-wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button type="button" className="guest" onClick={handleGuest}>
            Continue as Guest
          </button>

          <div className="login-links">
            <p onClick={handleForgotPassword}>Forgot Password?</p>
            <p onClick={handleRegister}>New here? Register</p>
          </div>
        </form>
      </div>
    </div>
  );

};

export default Login;
