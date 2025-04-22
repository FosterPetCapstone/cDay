// Configuration management for API keys and endpoints
const config = {
    // API Keys
    RETELL_API_KEY: process.env.RETELL_API_KEY || window.ENV?.RETELL_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || window.ENV?.OPENAI_API_KEY,

    // API Base URLs
    RETELL_API_BASE_URL: process.env.RETELL_API_BASE_URL || window.ENV?.RETELL_API_BASE_URL || 'https://api.retellai.com/v2',
    OPENAI_API_BASE_URL: process.env.OPENAI_API_BASE_URL || window.ENV?.OPENAI_API_BASE_URL || 'https://api.openai.com/v1',

    // Function to get Retell API Key
    getRetellApiKey: function() {
        return this.RETELL_API_KEY;
    },

    // Function to get OpenAI API Key
    getOpenAiApiKey: function() {
        return this.OPENAI_API_KEY;
    },

    // Function to get environment variables
    getApiKey: function() {
        // For local development, try to get from environment
        if (window.ENV && window.ENV.API_KEY) {
            return window.ENV.API_KEY;
        }
        
        // For production (GitHub Pages)
        // Replace this URL with your proxy service URL
        return fetch('https://your-proxy-service.com/api/getKey')
            .then(response => response.json())
            .then(data => data.apiKey)
            .catch(error => {
                console.error('Error fetching API key:', error);
                return null;
            });
    },

    // Base API URL
    apiBaseUrl: window.ENV?.API_BASE_URL || 'https://api.example.com'
};

// Export the config object
export default config; 