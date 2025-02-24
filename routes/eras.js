const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Get all era
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('eras')
        .select('*');
    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching eras data" });
    }

    res.json(data);
});

module.exports = router;