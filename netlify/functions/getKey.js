exports.handler = async function(event, context) {
    // Verify the request is coming from your GitHub Pages domain
    const allowedOrigins = ['https://yourusername.github.io'];
    const origin = event.headers.origin;

    if (!allowedOrigins.includes(origin)) {
        return {
            statusCode: 403,
            body: JSON.stringify({ error: 'Unauthorized origin' })
        };
    }

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET'
        },
        body: JSON.stringify({
            apiKey: process.env.API_KEY
        })
    };
}; 