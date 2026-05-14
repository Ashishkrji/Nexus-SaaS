import axios from 'axios';
import { logger } from '../../config/logger.js';

export async function anthropicComplete(prompt: string, apiKey: string, model = 'claude-3-5-sonnet-20241022'): Promise<string> {
  try {
    const res = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data.content[0].text;
  } catch (error: any) {
    logger.error('Anthropic API error:', error?.response?.data || error.message);
    throw new Error(`Anthropic completion failed: ${error?.response?.data?.error?.message || error.message}`);
  }
}
