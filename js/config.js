// Configuration management for API keys and endpoints
const config = {
    // Function to get environment variables
    getEnvVar: async function(key) {
        // For local development, try to get from environment
        if (window.ENV && window.ENV[key]) {
            return window.ENV[key];
        }
        
        // For production (Render)
        // Try to get from the server-side environment
        try {
            const response = await fetch('/api/get-env', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key })
            });

            if (response.ok) {
                const data = await response.json();
                return data.value;
            }
            throw new Error(`Failed to fetch ${key}`);
        } catch (error) {
            console.error(`Error fetching ${key}:`, error);
            return null;
        }
    },

    // Get API keys
    getRetellApiKey: async function() {
        return await this.getEnvVar('RETELL_API_KEY');
    },

    getOpenaiApiKey: async function() {
        return await this.getEnvVar('OPENAI_API_KEY');
    },

    // Base API URL
    apiBaseUrl: window.ENV?.API_BASE_URL || 'https://api.retellai.com'
}; 