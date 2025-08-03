// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // ✅
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, continueAsGuest } = useAuth(); // ✅ use context functions

  const handleLogin = async () => {
    const res = await login(email, password); // ✅ login from context
    if (res.success) {
      alert('✅ Login successful');
      navigate('/dashboard');
    } else {
      alert(`❌ ${res.message}`);
    }
  };

  const handleGuest = () => {
    continueAsGuest(); // ✅ persist guest user
    navigate('/dashboard');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
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
        <button type="button" onClick={handleGuest}>Continue as Guest</button>
        <p
          style={{ marginTop: '10px', cursor: 'pointer', color: 'blue' }}
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </p>
      </form>
    </div>
  );
};

export default Login;
