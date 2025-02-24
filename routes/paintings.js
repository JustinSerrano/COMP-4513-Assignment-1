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
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching paintings data" });
    }

    res.json(data);
});

// Get all paintings sorted by title or year
router.get('/sort/:sortBy', async (req, res) => {
    let { sortBy } = req.params;

    const sortMap = {
        title: "title",
        year: "yearOfWork"  // Maps user input "year" to "yearOfWork"
    };

    if (!sortMap[sortBy]) {
        return res.status(400).json({ error: "Invalid sort parameter. Must be 'title' or 'year'." });
    }

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
        .order(sortMap[sortBy], { ascending: true });
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching paintings data" });
    }

    res.json(data);
});

// Get painting by id
router.get('/:ref', async (req, res) => {
    const paintingId = parseInt(req.params.ref, 10);

    if (isNaN(paintingId) || paintingId < 1) {
        return res.status(400).json({ error: "Invalid painting ID. Must be a positive number." });
    }

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
        .eq('paintingId', paintingId)
        .order('title', { ascending: true });
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching paintings data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Painting not found" });
    }

    res.json(data);
});

// Search paintings by title
router.get('/search/:substring', async (req, res) => {
    const substring = req.params.substring.trim();

    if (!substring) {
        return res.status(400).json({ error: "Invalid title substring. Must be a non-empty." });
    }
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
        .ilike('title', `%${substring}%`)
        .order('title', { ascending: true });
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching paintings data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No paintings found with title ${substring}` });
    }

    res.json(data);
});

// Get paintings by year range
router.get('/years/:startYear/:endYear', async (req, res) => {
    let startYear = parseInt(req.params.startYear, 10);
    let endYear = parseInt(req.params.endYear, 10);

    if (isNaN(startYear) || isNaN(endYear) || startYear < 0 || endYear < 0) {
        return res.status(400).json({ error: "Invalid year input. Start and end years must be positive numbers." });
    }

    if (startYear > endYear) {
        return res.status(400).json({ error: "Start year cannot be greater than end year." });
    }

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
        .gte('yearOfWork', startYear)
        .lte('yearOfWork', endYear)
        .order('yearOfWork', { ascending: true });
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching paintings data" });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No paintings found between ${startYear} and ${endYear}.` });
    }

    res.json(data);
});

// Get paintings by gallery
router.get('/galleries/:ref', async (req, res) => {
    const galleryId = parseInt(req.params.ref, 10);

    if (isNaN(galleryId) || galleryId < 1) {
        return res.status(400).json({ error: "Invalid gallery ID. Must be a positive number." });
    }

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
        .eq('galleryId', galleryId)
        .order('title', { ascending: true });
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No paintings found for gallery ID ${galleryId}.` });
    }

    res.json(data);
});

// Get paintings by artist
router.get('/artist/:ref', async (req, res) => {
    const artistId = parseInt(req.params.ref, 10);

    if (isNaN(artistId) || artistId < 1) {
        return res.status(400).json({ error: "Invalid artist ID. Must be a positive number." });
    }
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
        .eq('artistId', artistId)
        .order('title', { ascending: true });
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No paintings found for artist ID ${artistId}.` });
    }

    res.json(data);
});

// Get paintings by artist's nationality
router.get('/artist/country/:ref', async (req, res) => {
    const nationality = req.params.ref.trim();

    if (!nationality || !/^[a-zA-Z\s]+$/.test(nationality)) {
        return res.status(400).json({ error: "Invalid nationality input. Must be a non-empty string containing only letters." });
    }
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
        .ilike('artists.nationality', `${nationality}%`)
        .order('title', { ascending: true });
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching paintings data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No paintings found for artists from '${nationality}'.` });
    }

    res.json(data);
});

// Get paintings by genre
router.get('/genre/:ref', async (req, res) => {
    const genreId = parseInt(req.params.ref, 10);

    if (isNaN(genreId) || genreId < 1) {
        return res.status(400).json({ error: "Invalid genre ID. Must be a positive number." });
    }
    const { data, error } = await supabase
        .from('paintingGenres')
        .select(`
        paintings!inner(paintingId, title, yearOfWork)
    `)
        .eq('genreId', genreId)
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching paintings data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No paintings found for genre ID ${genreId}.` });
    }

    const sortedData = data
        .map(item => ({
            paintingId: item.paintings.paintingId,
            title: item.paintings.title,
            yearOfWork: item.paintings.yearOfWork
        }))
        .sort((a, b) => a.yearOfWork - b.yearOfWork);

    res.json(sortedData);
});

// Get paintings by era
router.get('/era/:ref', async (req, res) => {
    const eraId = parseInt(req.params.ref, 10);

    if (isNaN(eraId) || eraId < 1) {
        return res.status(400).json({ error: "Invalid era ID. Must be a positive number." });
    }
    const { data, error } = await supabase
        .from('paintingGenres')
        .select(`
            paintings!inner(paintingId, title, yearOfWork),
            genres!inner(genreId, eraId)
        `)
        .eq('genres.eraId', eraId);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching paintings data" });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No paintings found for era ID ${eraId}.` });
    }

    const sortedData = data
        .map(item => ({
            paintingId: item.paintings.paintingId,
            title: item.paintings.title,
            yearOfWork: item.paintings.yearOfWork
        }))
        .sort((a, b) => a.yearOfWork - b.yearOfWork);

    res.json(sortedData);
});

module.exports = router;