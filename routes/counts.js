const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.get('/genres', async (req, res) => {
    const { data, error } = await supabase
        .from('paintingGenres')
        .select('genreId, genres(genreName), count:paintingId', { count: 'exact' })
        .group('genreId, genres(genreName)')
        .order('count', { ascending: true });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});
router.get('/artists', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select(`
            artistId, 
            artists!inner(artistName:concat(firstName, ' ', lastName)),
            count:paintingId',
            `, { count: 'exact' })
        .group('artistId, artists.firstName, artists.lastName)')
        .order('count', { ascending: false });
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});
router.get('/topgenres/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintingGenres')
        .select('genres!inner(genreName), count:paintingId', { count: 'exact' })
        .group('genres(genreName)')
        .order('count', { ascending: false });
    const filteredData = data.filter(item => item.count > req.params.ref);
    res.json(filteredData);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

module.exports = router;