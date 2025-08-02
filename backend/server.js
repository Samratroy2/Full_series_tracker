const express = require('express');
const cors = require('cors');
const animeRoutes = require('./routes/anime');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mount anime route
app.use('/api/anime', animeRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
