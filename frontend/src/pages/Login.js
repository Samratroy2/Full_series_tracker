// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      alert('✅ Login successful');
      navigate('/dashboard', { state: { user: data.user } });
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  const handleGuest = () => {
    navigate('/dashboard', { state: { guest: true } });
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
        <button type="button" className="guest" onClick={handleGuest}>Continue as Guest</button>
        <p style={{ marginTop: '10px', cursor: 'pointer', color: 'blue' }} onClick={handleForgotPassword}>
          Forgot Password?
        </p>
      </form>
    </div>
  );
};

export default Login;
