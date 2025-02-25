/**
 * Genres API Routes - COMP 4513 Assignment 1
 * Assisted by ChatGPT and Supabase
 */

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client Initialization
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * @route GET /api/genres
 * @desc Get all genres with their associated eras
 */
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('genres')
        .select(`
            genreId,
            genreName,
            description,
            eras!inner(eraId, eraName, eraYears`);

    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching genre data" });
    }

    res.json(data);
});

/**
 * @route GET /api/genres/:ref
 * @desc Get a specific genre by ID
 */
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
            description,
            eras!inner(eraId, eraName, eraYears`)
        .eq('genreId', genreId);

    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching genre data" });
    }
    if (!data) {
        return res.status(404).json({ error: `Genre with ID ${genreId} not found.` });
    }

    res.json(data);
});

/**
 * @route GET /api/genres/painting/:ref
 * @desc Get genres associated with a specific painting
 */
router.get('/painting/:ref', async (req, res) => {
    const paintingId = parseInt(req.params.ref, 10);

    if (isNaN(paintingId) || paintingId < 1) {
        return res.status(400).json({ error: "Invalid painting ID. Must be a positive number." });
    }

    const { data, error } = await supabase
        .from('paintingGenres')
        .select(`
            genres!inner(genreId, genreName, description, 
                eras!inner(eraId, eraName, eraYears)
            )`)
        .eq('paintingId', paintingId);

    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching genre data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No genres found for painting ID ${paintingId}.` });
    }

    // Transform and sort data alphabetically by genreName
    const sortedData = data
        .map(item => ({
            genreId: item.genres.genreId,
            genreName: item.genres.genreName,
            description: item.genres.description,
            eraId: item.genres.eras?.eraId || null,
            eraName: item.genres.eras?.eraName || "Unknown",
            eraYears: item.genres.eras?.eraYears || "Unknown"
        }))
        .sort((a, b) => a.genreName.localeCompare(b.genreName));

    res.json(sortedData);
});

module.exports = router;