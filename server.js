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

// Function to check environment variables and secrets
function checkEnvironment() {
    console.log('\nEnvironment Configuration:');
    
    // Check direct environment variables first (Render sets these from the dashboard)
    const envVars = ['RETELL_API_KEY', 'OPENAI_API_KEY'];
    envVars.forEach(key => {
        console.log(`${key} environment variable: ${process.env[key] ? 'Set' : 'Not set'}`);
    });
    
    // Check Render secrets mount at /etc/secrets/
    console.log('\nChecking mounted secrets in /etc/secrets/:');
    const secretFiles = [
        '/etc/secrets/RETELL_API_KEY',
        '/etc/secrets/OPENAI_API_KEY'
    ];
    
    secretFiles.forEach(file => {
        const exists = fs.existsSync(file);
        console.log(`${file}: ${exists ? 'Found' : 'Not found'}`);
        
        if (exists) {
            try {
                // If file exists but corresponding env var doesn't, set it
                const key = path.basename(file);
                if (!process.env[key]) {
                    process.env[key] = fs.readFileSync(file, 'utf8').trim();
                    console.log(`Set ${key} from secret file`);
                }
            } catch (err) {
                console.error(`Error reading ${file}:`, err.message);
            }
        }
    });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    checkEnvironment();
}); 