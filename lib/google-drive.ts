import { google } from 'googleapis'

// Validate environment variables
const requiredEnvVars = [
  'GOOGLE_DRIVE_CLIENT_ID',
  'GOOGLE_DRIVE_CLIENT_SECRET', 
  'GOOGLE_DRIVE_REFRESH_TOKEN',
  'GOOGLE_DRIVE_FOLDER_ID'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_CLIENT_ID,
  process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  'http://localhost:3000' // This should match your OAuth redirect URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
});

// Handle token refresh automatically
oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // Store the new refresh token if provided
    console.log('New refresh token received');
  }
});

export const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Test function to verify authentication
export async function testDriveAuth() {
  try {
    const response = await drive.about.get({ fields: 'user' });
    console.log('Google Drive authenticated successfully:', response.data.user?.emailAddress);
    return true;
  } catch (error) {
    console.error('Google Drive authentication failed:', error);
    return false;
  }
}