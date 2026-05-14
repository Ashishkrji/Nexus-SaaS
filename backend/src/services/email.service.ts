import nodemailer from 'nodemailer';
import { logger } from '../config/logger.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,  // App Password, not actual password
  }
});

export async function sendVerificationEmail(to: string, token: string) {
  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject: 'Verify your GBP Optimizer account',
      html: `<a href="${process.env.APP_URL}/verify-email?token=${token}">Click to verify</a>`
    });
    logger.info(`Verification email sent to ${to}`);
  } catch (error) {
    logger.error('Error sending verification email:', error);
  }
}

export async function sendReviewAlert(to: string, reviewData: any) {
  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject: `⚠️ New ${reviewData.rating}★ review needs attention`,
      html: `<p>New review from <b>${reviewData.authorName}</b>: "${reviewData.comment}"</p>`
    });
    logger.info(`Review alert sent to ${to}`);
  } catch (error) {
    logger.error('Error sending review alert:', error);
  }
}
