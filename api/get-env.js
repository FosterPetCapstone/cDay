const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', (req, res) => {
    try {
        const { key } = req.body;
        
        if (!key) {
            return res.status(400).json({ 
                success: false,
                error: 'Key is required',
                value: null
            });
        }

        // Try to read from /etc/secrets/
        const secretFilePath = `/etc/secrets/${key}`;
        console.log(`Checking secret file: ${secretFilePath}`);
        
        try {
            if (fs.existsSync(secretFilePath)) {
                const value = fs.readFileSync(secretFilePath, 'utf8').trim();
                console.log(`Found value in ${secretFilePath}`);
                return res.json({ 
                    success: true,
                    error: null,
                    value 
                });
            } else {
                console.log(`Secret file not found: ${secretFilePath}`);
                return res.status(404).json({ 
                    success: false,
                    error: `Secret file not found at ${secretFilePath}`,
                    value: null
                });
            }
        } catch (fsError) {
            console.error(`Error reading secret file: ${fsError.message}`);
            return res.status(500).json({ 
                success: false,
                error: `Error reading secret file: ${fsError.message}`,
                value: null
            });
        }
    } catch (error) {
        console.error('Error in get-env:', error);
        return res.status(500).json({ 
            success: false,
            error: `Internal server error: ${error.message}`,
            value: null
        });
    }
});

module.exports = router; 