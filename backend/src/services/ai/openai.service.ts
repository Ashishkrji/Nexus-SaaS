import axios from 'axios';
import { logger } from '../../config/logger.js';

export async function openaiComplete(prompt: string, apiKey: string, model = 'gpt-4o-mini'): Promise<string> {
  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
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
    logger.error('OpenAI API error:', error?.response?.data || error.message);
    throw new Error(`OpenAI completion failed: ${error?.response?.data?.error?.message || error.message}`);
  }
}
