// Configuration management for API keys and endpoints
const config = {
    // Function to get environment variables
    getEnvVar: async function(key) {
        try {
            // For local development, try to get from environment
            if (window.ENV && window.ENV[key]) {
                return window.ENV[key];
            }
            
            // For production (Render)
            // Try to get from the server-side environment
            const response = await fetch('/api/get-env', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key })
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server response was not JSON');
            }

            const data = await response.json();
            console.log(`Response for ${key}:`, data);

            if (!data.success) {
                throw new Error(data.error || 'Unknown error occurred');
            }

            if (!data.value) {
                throw new Error(`No value found for ${key}`);
            }

            return data.value;
        } catch (error) {
            console.error(`Error fetching ${key}:`, error);
            throw error;
        }
    },

    // Get API keys
    getRetellApiKey: async function() {
        try {
            return await this.getEnvVar('RETELL_API_KEY');
        } catch (error) {
            console.error('Failed to get RETELL_API_KEY:', error);
            throw new Error('Failed to get Retell API key. Please check server configuration.');
        }
    },

    getOpenaiApiKey: async function() {
        try {
            return await this.getEnvVar('OPENAI_API_KEY');
        } catch (error) {
            console.error('Failed to get OPENAI_API_KEY:', error);
            throw new Error('Failed to get OpenAI API key. Please check server configuration.');
        }
    },

    // Base API URL
    apiBaseUrl: window.ENV?.API_BASE_URL || 'https://api.retellai.com'
}; 