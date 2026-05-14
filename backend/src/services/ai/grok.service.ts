import axios from 'axios';
import { logger } from '../../config/logger.js';

// Grok uses OpenAI-compatible API format
export async function grokComplete(prompt: string, apiKey: string, model = 'grok-2'): Promise<string> {
  try {
    const res = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data.choices[0].message.content;
  } catch (error: any) {
    logger.error('Grok API error:', error?.response?.data || error.message);
    throw new Error(`Grok completion failed: ${error?.response?.data?.error?.message || error.message}`);
  }
}
