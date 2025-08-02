// backend/routes/admin.js

const express = require('express');
const router = express.Router();

// Dummy admin credentials
const adminUsers = [
  {
    email: 'admin@example.com',
    password: 'admin123', // In real-world apps, NEVER store passwords in plain text
  }
];

// Dummy analytics data
const analyticsData = {
  totalUsers: 120,
  totalShowsTracked: 320,
  popularGenres: ['Action', 'Adventure', 'Romance'],
  activeClubs: 5
};

// Admin login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const admin = adminUsers.find(user => user.email === email && user.password === password);

  if (admin) {
    res.json({ success: true, message: 'Login successful', user: { email } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get analytics
router.get('/analytics', (req, res) => {
  res.json(analyticsData);
});

module.exports = router;
