// Load environment variables for local development
(function loadEnvironment() {
    window.ENV = {};
    
    // Function to load environment variables from .env file
    async function loadEnvFile() {
        try {
            const response = await fetch('/.env');
            const text = await response.text();
            
            // Parse .env file
            text.split('\n').forEach(line => {
                const [key, value] = line.split('=').map(part => part.trim());
                if (key && value && !key.startsWith('#')) {
                    window.ENV[key] = value;
                }
            });
        } catch (error) {
            console.log('No .env file found, using production configuration');
        }
    }

    // Load environment variables if we're in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        loadEnvFile();
    }
})(); 