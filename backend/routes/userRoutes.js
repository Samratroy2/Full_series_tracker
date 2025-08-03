// backend\routes\userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Get all users (Only for a specific email)
router.get('/', async (req, res) => {
  const requestorEmail = req.query.email;

  if (requestorEmail !== 'trysamrat1@gmail.com') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const users = await User.find({}, '-password -otp -otpExpires'); // hide sensitive fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

module.exports = router;
