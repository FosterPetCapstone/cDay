const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    try {
        const { key } = req.body;
        
        if (!key) {
            return res.status(400).json({ 
                success: false,
                error: 'Key is required' 
            });
        }

        // Get the environment variable
        const value = process.env[key];
        
        if (!value) {
            return res.status(404).json({ 
                success: false,
                error: `Environment variable ${key} not found` 
            });
        }

        // Return the value
        res.json({ 
            success: true,
            value 
        });
    } catch (error) {
        console.error('Error in get-env:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
        });
    }
});

module.exports = router; 