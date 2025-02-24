const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Get all genres with painting counts
router.get('/genres', async (req, res) => {
    const { data, error } = await supabase
        .from('paintingGenres')
        .select('genreId, genres!inner(genreName)');
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching genre data" });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "No genres found." });
    }

    const genreCounts = {};
    data.forEach(({ genreId, genres }) => {
        if (!genreCounts[genreId]) {
            genreCounts[genreId] = { genreId, genreName: genres.genreName, count: 0 };
        }
        genreCounts[genreId].count += 1;
    });

    const sortedData = Object.values(genreCounts).sort((a, b) => a.count - b.count);

    res.json(sortedData);
});

// Get all artists with painting counts
router.get('/artists', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select(`
            artistId, 
            artists!inner(firstName, lastName)`);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching artist data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: "No artists found." });
    }

    const artistCounts = {};
    data.forEach(({ artistId, artists }) => {
        if (!artistCounts[artistId]) {
            artistCounts[artistId] = {
                artistId,
                artistName: `${artists.firstName} ${artists.lastName}`,
                count: 0
            };
        }
        artistCounts[artistId].count += 1;
    });

    const sortedData = Object.values(artistCounts).sort((a, b) => b.count - a.count);

    res.json(sortedData);
});

// Get all genres with a minimum number of paintings
router.get('/topgenres/:ref', async (req, res) => {
    const minCount = parseInt(req.params.ref, 10);

    if (isNaN(minCount) || minCount < 1) {
        return res.status(400).json({ error: "Invalid reference value. Must be a positive number." });
    }
    const { data, error } = await supabase
        .from('paintingGenres')
        .select('genreId, genres!inner(genreName)');

    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }

    const genreCounts = {};
    data.forEach(({ genreId, genres }) => {
        if (!genreCounts[genreId]) {
            genreCounts[genreId] = { genreId, genreName: genres.genreName, count: 0 };
        }
        genreCounts[genreId].count += 1;
    });

    const filteredData = Object.values(genreCounts)
        .filter(item => item.count > minCount)
        .sort((a, b) => b.count - a.count);

    if (filteredData.length === 0) {
        return res.status(404).json({ error: `No genres found with more than ${minCount} paintings.` });
    }

    res.json(filteredData);
});

module.exports = router;