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
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get artist by ID
router.get('/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('artistId', req.params.ref);
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get all paintings by artist
router.get('/search/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select('*')
        .ilike('lastName', `${req.params.substring}%`);
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get all paintings by country
router.get('/country/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select('*')
        .ilike('nationality', `${req.params.substring}%`);
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

module.exports = router;