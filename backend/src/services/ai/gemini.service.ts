import axios from 'axios';
import { logger } from '../../config/logger.js';

export async function geminiComplete(prompt: string, apiKey: string, model = 'gemini-1.5-flash'): Promise<string> {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7
        }
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return res.data.candidates[0].content.parts[0].text;
  } catch (error: any) {
    logger.error('Gemini API error:', error?.response?.data || error.message);
    throw new Error(`Gemini completion failed: ${error?.response?.data?.error?.message || error.message}`);
  }
}
