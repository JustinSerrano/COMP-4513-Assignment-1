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
    }
});
app.get('/api/galleries/country/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .ilike('country', `%${req.params.substring}%`);
    res.json(data);
    if (error) {
        console.error(error);
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
    }
});
app.get('/api/artists/search/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select('*')
        .ilike('name', `%${req.params.substring}%`);
    res.json(data);
    if (error) {
        console.error(error);
    }
});
app.get('/api/artists/country/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select('*')
        .ilike('country', `%${req.params.substring}%`);
    res.json(data);
    if (error) {
        console.error(error);
    }
});