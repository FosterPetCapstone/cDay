# Transcript Viewer & Biography Generator

This HTML page allows you to view call transcripts and generate biographies based on call IDs, styled to match the application's yellow and black theme.

## Features

- Enter a call ID to view the associated transcript
- Generate a biography based on the transcript content
- View existing biographies that have already been generated
- Yellow and black styling consistent with the rest of the application
- Responsive design that works on desktop and mobile devices

## How to Use

1. Make sure the backend server is running at `http://localhost:8080`
2. Open the `transcript-viewer.html` file in your browser
3. Enter a valid Call ID in the input field and click "Load Transcript"
4. If a transcript is found, it will be displayed on the left side
5. If a biography already exists for this call, it will be displayed on the right side
6. If no biography exists yet, you can click "Generate Biography" to create one

## Design Notes

- The application features a black navigation bar and gold/yellow headers
- Content areas are bordered with gold to match the styling in the main app
- Biography and transcript panels are styled consistently with the rest of the application

## Technical Details

### Backend Integration

This page uses two new API endpoints:

- `POST /api/get-transcript` - Retrieves a transcript by call ID
- `POST /api/generate-biography` - Generates a biography from a transcript and stores it in the database

### Required Fields

When generating a biography, the system will:

1. Check if a biographical entry already exists in the database
2. If not, fetch the transcript, generate a biography using GPT-4, and save it
3. It also identifies if photography is needed based on specific phrases in the transcript

## Troubleshooting

- If you get "No transcript available for this call ID", the call ID may be invalid or no transcript is available yet
- If the biography generation fails, check that the OpenAI API is properly configured in the backend
- For other issues, check the browser console for detailed error messages

## Next Steps

Future enhancements could include:
- Adding authentication for accessing transcripts
- Ability to edit and update generated biographies
- Batch processing of multiple call IDs
- Enhanced formatting options for the biography output 