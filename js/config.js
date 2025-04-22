// Configuration management for API keys and endpoints
const config = {
    // Function to get environment variables
    getEnvVar: function(key) {
        // For local development, try to get from environment
        if (window.ENV && window.ENV[key]) {
            return window.ENV[key];
        }
        
        // For production (Render)
        // Try to get from /etc/secrets/ENV first
        return fetch(`/etc/secrets/${key}`)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                // If not found in /etc/secrets, try root directory
                return fetch(`/${key}`)
                    .then(response => response.text())
                    .catch(() => null);
            })
            .catch(error => {
                console.error(`Error fetching ${key}:`, error);
                return null;
            });
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