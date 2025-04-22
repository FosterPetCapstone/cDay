const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    try {
        const { key } = req.body;
        
        if (!key) {
            return res.status(400).json({ 
                success: false,
                error: 'Key is required' 
            });
        }

        // First try to get from process.env (Render environment variables)
        let value = process.env[key];
        
        // If not found in process.env, try to read from /etc/secrets/
        if (!value) {
            const secretFilePath = `/etc/secrets/${key}`;
            console.log(`Checking secret file: ${secretFilePath}`);
            
            if (fs.existsSync(secretFilePath)) {
                value = fs.readFileSync(secretFilePath, 'utf8').trim();
                console.log(`Found value in ${secretFilePath}`);
            } else {
                console.log(`Secret file not found: ${secretFilePath}`);
            }
        }
        
        if (!value) {
            return res.status(404).json({ 
                success: false,
                error: `API key not found. Please check that the secret file /etc/secrets/${key} exists on the server.` 
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