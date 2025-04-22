const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { key } = req.body;
    
    if (!key) {
        return res.status(400).json({ error: 'Key is required' });
    }

    // Get the environment variable
    const value = process.env[key];
    
    if (!value) {
        return res.status(404).json({ error: `Environment variable ${key} not found` });
    }

    // Return the value
    res.json({ value });
});

module.exports = router; 