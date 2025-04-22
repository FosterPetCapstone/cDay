# Foster AI Application

## Deployment to Render

### Option 1: Using Render Dashboard

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: foster-ai-app
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Select an appropriate plan

4. Add Environment Variables in the Render Dashboard:
   - `RETELL_API_KEY`: Your Retell API key
   - `OPENAI_API_KEY`: Your OpenAI API key

### Option 2: Using Render Blueprint (render.yaml)

1. Make sure the `render.yaml` file is in your repository
2. Go to the Render Dashboard → [Blueprints](https://dashboard.render.com/blueprints)
3. Create a new Blueprint Instance by connecting your repository
4. Render will automatically detect the `render.yaml` file and set up the services
5. You will need to set up secrets for:
   - `RETELL_API_KEY`: Your Retell API key
   - `OPENAI_API_KEY`: Your OpenAI API key

## Local Development

1. Clone the repository
2. Create a `.env` file based on `.env.template`
3. Run `npm install`
4. Run `npm start`
5. Open `http://localhost:3000` in your browser

## Environment Variables

The application uses the following environment variables:

- `RETELL_API_KEY`: Your Retell API key
- `OPENAI_API_KEY`: Your OpenAI API key

These can be set in three ways:
1. As environment variables in the Render Dashboard
2. As mounted secrets at `/etc/secrets/` (Render's secret files)
3. In a local `.env` file for development 