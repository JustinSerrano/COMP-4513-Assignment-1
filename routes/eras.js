/**
 * Eras API Routes - COMP 4513 Assignment 1
 * Assisted by ChatGPT and Supabase
 */

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client Initialization
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * @route GET /api/eras
 * @desc Get all eras
 */
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('eras')
        .select('*');

    if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Error fetching eras data" });
    }

    res.json(data);
});

module.exports = router;