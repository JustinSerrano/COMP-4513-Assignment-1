const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Get all artists
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select('*');
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching artists data" });
    }

    res.json(data);
});

// Get artist by ID
router.get('/:ref', async (req, res) => {
    const artistId = parseInt(req.params.ref, 10);

    if (isNaN(artistId) || artistId < 1) {
        return res.status(400).json({ error: "Invalid artist ID. Must be a positive number." });
    }

    const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('artistId', artistId);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching artists data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Artist not found" });
    }

    res.json(data);
});

// Get all paintings by artist
router.get('/search/:substring', async (req, res) => {
    const substring = req.params.substring.trim();

    if (!substring || !/^[a-zA-Z\s]+$/.test(substring)) {
        return res.status(400).json({ error: "Invalid artist substring. Must be a non-empty string containing only letters." });
    }
    const { data, error } = await supabase
        .from('artists')
        .select('*')
        .ilike('lastName', `${substring}%`);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching artists data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: "No artists found" });
    }

    res.json(data);
});

// Get all paintings by country
router.get('/country/:substring', async (req, res) => {
    const substring = req.params.substring.trim();

    if (!substring || !/^[a-zA-Z\s]+$/.test(substring)) {
        return res.status(400).json({ error: "Invalid nationality substring. Must be a non-empty string containing only letters." });
    }
    const { data, error } = await supabase
        .from('artists')
        .select('*')
        .ilike('nationality', `${substring}%`);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: "No artists found" });
    }

    res.json(data);
});

module.exports = router;