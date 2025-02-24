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
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get genre by ID
router.get('/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('genres')
        .select('*')
        .eq('genreId', req.params.ref);
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get all paintings by genre
router.get('/paintings/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('genres')
        .select('*')
        .eq('genreId', req.params.ref)
        .order('genreName', { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

module.exports = router;