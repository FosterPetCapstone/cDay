const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const getEnvRouter = require('./api/get-env');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/api/get-env', getEnvRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Function to check secret file locations
function checkSecretLocations() {
    const secretFiles = [
        '/etc/secrets/RETELL_API_KEY',
        '/etc/secrets/OPENAI_API_KEY'
    ];
    
    return secretFiles.map(file => ({
        file,
        exists: fs.existsSync(file)
    }));
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    
    // Check and log secret file locations
    console.log('\nChecking secret files in /etc/secrets/:');
    const locations = checkSecretLocations();
    locations.forEach(({file, exists}) => {
        console.log(`${file}: ${exists ? 'Found' : 'Not found'}`);
    });
}); 