import cron from 'node-cron';
import { logger } from '../config/logger.js';

export function setupCronJobs() {
  logger.info('Initializing cron jobs...');

  // Every 2 hours — sync reviews from GBP
  cron.schedule('0 */2 * * *', async () => {
    logger.info('Running review sync job...');
    // await syncAllReviews();
  });

  // Every 5 minutes — check scheduled posts
  cron.schedule('*/5 * * * *', async () => {
    logger.debug('Checking for scheduled posts...');
    // await processScheduledPosts();
  });

  // Every day at midnight — refresh Google tokens
  cron.schedule('0 0 * * *', async () => {
    logger.info('Refreshing expired Google tokens...');
    // await refreshExpiredTokens();
  });

  // Every Sunday — weekly SEO audit
  cron.schedule('0 9 * * 0', async () => {
    logger.info('Running weekly SEO audit...');
    // await runWeeklySEOAudit();
  });
}
