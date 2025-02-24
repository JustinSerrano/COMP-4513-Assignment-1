const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Get all paintings
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select(`
            paintingId,
            title,
            yearOfWork,
            imageFileName,
            artists!inner(*),
            galleries!inner(*)
        `)
        .order('title', { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get all paintings sorted by title or yearOfWork
router.get('/sort/:sortBy', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .order(req.params.sortBy, { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get painting by id
router.get('/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('paintingId', req.params.ref)
        .order('title', { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Search paintings by title
router.get('/search/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .ilike('title', `%${req.params.substring}%`)
        .order('title', { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get paintings by year range
router.get('/years/:startYear/:endYear', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .gte('yearOfWork', req.params.startYear)
        .lte('yearOfWork', req.params.endYear)
        .order('yearOfWork', { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get paintings by gallery
router.get('/galleries/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('galleryId', req.params.ref)
        .order('title', { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get paintings by artist
router.get('/artists/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('artistId', req.params.ref)
        .order('title', { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get paintings by artist's country
router.get('/artists/country/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('nationality', req.params.ref)
        .order('title', { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get paintings by genre
router.get('/genre/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select(`
            paintingId,
            title,
            yearOfWork`)
        .eq('genreId', req.params.ref)
        .order('yearOfWork', { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Get paintings by era
router.get('/era/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select(`
            paintingId,
            title,
            yearOfWork`)
        .eq('eraId', req.params.ref)
        .order('yearOfWork', { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

module.exports = router;