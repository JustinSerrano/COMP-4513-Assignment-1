/**
 * Artists API Routes - COMP 4513 Assignment 1
 * Assisted by ChatGPT and Supabase
 */

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client Initialization
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * @route GET /api/artists
 * @desc Get all artists
 */
router.get('/', async (req, res) => {
    const { data, error } = await supabase
    .from('artists')
    .select('*');

    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching artists data" });
    }

    res.json(data);
});

/**
 * @route GET /api/artists/:ref
 * @desc Get artist by ID
 */
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
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching artist data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Artist not found" });
    }

    res.json(data[0]); // Return a single object instead of an array
});

/**
 * @route GET /api/artists/search/:substring
 * @desc Search artists by last name
 */
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
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching artist data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: "No artists found" });
    }

    res.json(data);
});

/**
 * @route GET /api/artists/country/:substring
 * @desc Get artists by nationality
 */
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
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching artist data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: "No artists found" });
    }

    res.json(data);
});

module.exports = router;