/**
 * Galleries API Routes - COMP 4513 Assignment 1
 * Assisted by ChatGPT and Supabase
 */

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client Initialization
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


/**
 * @route GET /api/galleries
 * @desc Get all galleries
 */
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select('*');
    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching gallery data" });
    }

    res.json(data);
});

/**
 * @route GET /api/galleries/:ref
 * @desc Get a gallery by ID
 */
router.get('/:ref', async (req, res) => {
    const galleryId = parseInt(req.params.ref, 10);

    if (isNaN(galleryId) || galleryId < 1) {
        return res.status(400).json({ error: "Invalid gallery ID. Must be a positive number." });
    }

    const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .eq('galleryId', galleryId);

    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching gallery data" });
    }
    if (!data) {
        return res.status(404).json({ error: "Gallery not found" });
    }

    res.json(data[0]); // Return a single object instead of an array
});

/**
 * @route GET /api/galleries/country/:substring
 * @desc Search galleries by country
 */
router.get('/country/:substring', async (req, res) => {
    const substring = req.params.substring.trim();

    if (!substring || !/^[a-zA-Z\s]+$/.test(substring)) {
        return res.status(400).json({ error: "Invalid country substring. Must be a non-empty string containing only letters." });
    }

    const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .ilike('galleryCountry', `${substring}%`);

    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching gallery data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: "No galleries found" });
    }

    res.json(data);
});

module.exports = router;