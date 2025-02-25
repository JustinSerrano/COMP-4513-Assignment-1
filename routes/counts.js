/**
 * Counts API Routes - COMP 4513 Assignment 1
 * Assisted by ChatGPT and Supabase
 */

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client Initialization
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * @route GET /api/counts/genres
 * @desc Get all genres with painting counts (sorted fewest to most)
 */
router.get('/genres', async (req, res) => {
    const { data, error } = await supabase
        .from('paintingGenres')
        .select('genreId, genres!inner(genreName)');

    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching genre data" });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "No genres found." });
    }

    // Count paintings per genre
    const genreCounts = {};
    data.forEach(({ genreId, genres }) => {
        if (!genreCounts[genreId]) {
            genreCounts[genreId] = { genreId, genreName: genres.genreName, count: 0 };
        }
        genreCounts[genreId].count += 1;
    });

    // Sort genres from fewest to most paintings
    res.json(Object.values(genreCounts).sort((a, b) => a.count - b.count));
});

/**
 * @route GET /api/counts/artists
 * @desc Get all artists with painting counts (sorted most to least)
 */
router.get('/artists', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select('artistId, artists!inner(firstName, lastName)');

    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching artist data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: "No artists found." });
    }

    // Count paintings per artist
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

    // Sort artists from most to least paintings
    res.json(Object.values(artistCounts).sort((a, b) => b.count - a.count));
});

/**
 * @route GET /api/counts/topgenres/:ref
 * @desc Get all genres with at least `minCount` paintings (sorted most to least)
 */
router.get('/topgenres/:ref', async (req, res) => {
    const minCount = parseInt(req.params.ref, 10);

    if (isNaN(minCount) || minCount < 1) {
        return res.status(400).json({ error: "Invalid reference value. Must be a positive number." });
    }
    const { data, error } = await supabase
        .from('paintingGenres')
        .select('genreId, genres!inner(genreName)');

    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching data" });
    }

    // Count paintings per genre
    const genreCounts = {};
    data.forEach(({ genreId, genres }) => {
        if (!genreCounts[genreId]) {
            genreCounts[genreId] = { genreId, genreName: genres.genreName, count: 0 };
        }
        genreCounts[genreId].count += 1;
    });

    // Filter genres with more than `minCount` paintings and sort from most to least
    const filteredData = Object.values(genreCounts)
        .filter(item => item.count > minCount)
        .sort((a, b) => b.count - a.count);

    if (filteredData.length === 0) {
        return res.status(404).json({ error: `No genres found with more than ${minCount} paintings.` });
    }

    res.json(filteredData);
});

module.exports = router;