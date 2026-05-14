import { google } from 'googleapis';
import { User } from '../../models/User.model.js';
import { GBPConnection } from '../../models/GBPConnection.model.js';
import { encrypt } from '../../utils/encrypt.js';
import { logger } from '../../config/logger.js';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export function getAuthUrl(userId: string) {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/business.manage',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ],
    state: userId,   // pass userId to callback
    prompt: 'consent'
  });
}

export async function handleCallback(code: string, userId: string) {
  try {
    // 1. Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // 2. Get Google user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: googleUser } = await oauth2.userinfo.get();

    // 3. EMAIL MATCH CHECK — Critical security step
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    
    if (user.email !== googleUser.email) {
      throw new Error('EMAIL_MISMATCH: GBP account email must match your login email');
    }

    // 4. Save encrypted connection
    const connection = await GBPConnection.findOneAndUpdate(
      { userId, googleEmail: googleUser.email },
      {
        accessToken: encrypt(tokens.access_token!),
        refreshToken: tokens.refresh_token ? encrypt(tokens.refresh_token) : undefined,
        expiresAt: new Date(tokens.expiry_date!),
        connectionMethod: 'OAUTH',
        isActive: true
      },
      { upsert: true, new: true }
    );

    // 5. Fetch all business locations (Placeholder)
    // const locations = await fetchBusinessLocations(tokens.access_token);
    return { connection, googleUser };
  } catch (error) {
    logger.error('Google OAuth callback error:', error);
    throw error;
  }
}
