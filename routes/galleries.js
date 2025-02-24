const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Get all galleries
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select('*');
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching gallery data" });
    }
});

// Get gallery by ID
router.get('/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .eq('galleryId', req.params.ref);
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Search galleries by country
router.get('/country/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .ilike('galleryCountry', `${req.params.substring}%`);
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

module.exports = router;