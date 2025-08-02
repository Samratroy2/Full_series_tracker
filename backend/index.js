// backend/index.js

const express = require('express');
const app = express();
const cors = require('cors');
const animeRoutes = require('./routes/anime');

// Middleware
app.use(cors());
app.use(express.json());

// Use local JSON API route
app.use('/api/anime', animeRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Remove MongoDB connection (if not using it)

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
