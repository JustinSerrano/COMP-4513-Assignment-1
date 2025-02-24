const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Get all genres
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('genres')
        .select(`
            genreId,
            genreName,
            eras!inner(*),
            description`);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching genre data" });
    }

    res.json(data);
});

// Get genre by ID
router.get('/:ref', async (req, res) => {
    const genreId = parseInt(req.params.ref, 10);

    if (isNaN(genreId) || genreId < 1) {
        return res.status(400).json({ error: "Invalid genre ID. Must be a positive number." });
    }

    const { data, error } = await supabase
        .from('genres')
        .select(`
            genreId,
            genreName,
            eras!inner(*),
            description`)
        .eq('genreId', genreId);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching genre data" });
    }
    if (!data) {
        return res.status(404).json({ error: `Genre with ID ${genreId} not found.` });
    }

    res.json(data);
});

// Get genres by painting
router.get('/painting/:ref', async (req, res) => {
    const paintingId = parseInt(req.params.ref, 10);

    if (isNaN(paintingId) || paintingId < 1) {
        return res.status(400).json({ error: "Invalid painting ID. Must be a positive number." });
    }

    const { data, error } = await supabase
        .from('paintingGenres')
        .select(`
            genres!inner(genreId, genreName, description, eras!inner(eraId, eraName, eraYears))
            `)
        .eq('paintingId', paintingId);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching genre data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No genres found for painting ID ${paintingId}.` });
    }

    const sortedData = data
        .map(item => ({
            genreId: item.genres.genreId,
            genreName: item.genres.genreName,
            description: item.genres.description,
            eraId: item.genres.eras.eraId,
            eraName: item.genres.eras.eraName,
            eraYears: item.genres.eras.eraYears
        }))
        .sort((a, b) => a.genreName.localeCompare(b.genreName));

    res.json(sortedData);
});

module.exports = router;