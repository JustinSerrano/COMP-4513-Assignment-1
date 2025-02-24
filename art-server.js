// This work was assisted with Copilot (ChatGPT) and Supabase

const express = require('express');
const supa = require('@supabase/supabase-js');

const app = express();

const supaUrl = 'https://aoahnabafgkivqnrylch.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvYWhuYWJhZmdraXZxbnJ5bGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzODA3ODMsImV4cCI6MjA1NTk1Njc4M30.2ftV_-cdH_v2EkHpmAeZZCLqt3JhBAFDk_79cCHk6xU';

const supabase = supa.createClient(supaUrl, supaAnonKey);

// Era route
app.get('/api/era', async (req, res) => {
    const { data, error } = await supabase
        .from('era')
        .select('*');
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});

// Galleries route
app.get('/api/galleries', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select('*');
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});
app.get('/api/galleries/:ref', async (req, res) => {
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
app.get('/api/galleries/country/:substring', async (req, res) => {
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

// Artists route
app.get('/api/artists', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select('*');
    res.json(data);
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching data" });
    }
});
app.get('/api/artists/:ref', async (req, res) => {
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
app.get('/api/artists/search/:substring', async (req, res) => {
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
app.get('/api/artists/country/:substring', async (req, res) => {
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

// Paintings route
app.get('/api/paintings', async (req, res) => {
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
app.get('/api/paintings/sort/:sortBy', async (req, res) => {
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
app.get('/api/paintings/:ref', async (req, res) => {
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
app.get('/api/paintings/search/:substring', async (req, res) => {
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
app.get('/api/paintings/years/:startYear/:endYear', async (req, res) => {
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
app.get('/api/paintings/galleries/:ref', async (req, res) => {
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
app.get('/api/paintings/artists/:ref', async (req, res) => {
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
app.get('/api/paintings/artists/country/:ref', async (req, res) => {
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
app.get('/api/paintings/genre/:ref', async (req, res) => {
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
app.get('/api/paintings/era/:ref', async (req, res) => {
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

// Genres route
app.get('/api/genres', async (req, res) => {
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
app.get('/api/genres/:ref', async (req, res) => {
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
app.get('/api/genres/paintings/:ref', async (req, res) => {
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

// Counts route
app.get('/api/counts/genres', async (req, res) => {
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
app.get('/api/counts/artists', async (req, res) => {
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
app.get('/api/counts/topgenres/:ref', async (req, res) => {
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