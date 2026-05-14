import { google } from 'googleapis';
import { logger } from '../../config/logger.js';

export async function fetchBusinessLocations(accessToken: string) {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    
    // Using MyBusiness Account Management API for listing accounts
    const accountManagement = google.mybusinessaccountmanagement({
      version: 'v1',
      auth
    });

    const res = await accountManagement.accounts.list();
    return res.data.accounts;
  } catch (error) {
    logger.error('Error fetching GBP locations:', error);
    throw error;
  }
}
