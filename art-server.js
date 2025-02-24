// This work was assisted with Copilot (ChatGPT) and Supabase

const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import Routes
const eraRoutes = require('./routes/eras');
const galleriesRoutes = require('./routes/galleries');
const artistsRoutes = require('./routes/artists');
const paintingsRoutes = require('./routes/paintings');
const genresRoutes = require('./routes/genres');
const countsRoutes = require('./routes/counts');

// Use Routes
app.use('/api/eras', eraRoutes);
app.use('/api/galleries', galleriesRoutes);
app.use('/api/artists', artistsRoutes);
app.use('/api/paintings', paintingsRoutes);
app.use('/api/genres', genresRoutes);
app.use('/api/counts', countsRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the COMP 4513 ART-API');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});