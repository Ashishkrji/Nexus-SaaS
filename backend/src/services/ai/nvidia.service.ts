import axios from 'axios';
import { logger } from '../../config/logger.js';

const NVIDIA_MODELS = {
  'llama-3.1-70b': 'meta/llama-3.1-70b-instruct',
  'llama-3.1-8b': 'meta/llama-3.1-8b-instruct',
  'mistral-7b': 'mistralai/mistral-7b-instruct-v0.3',
  'nemotron-70b': 'nvidia/nemotron-4-340b-instruct',
  'mixtral-8x7b': 'mistralai/mixtral-8x7b-instruct-v0.1',
} as const;

export type NvidiaModel = keyof typeof NVIDIA_MODELS;

export async function nvidiaComplete(prompt: string, model?: string): Promise<string> {
  const resolvedModel = model
    ? (NVIDIA_MODELS[model as NvidiaModel] || model)
    : (process.env.NVIDIA_DEFAULT_MODEL || 'meta/llama-3.1-70b-instruct');

  try {
    const res = await axios.post(
      `${process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1'}/chat/completions`,
      {
        model: resolvedModel,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data.choices[0].message.content;
  } catch (error: any) {
    logger.error('NVIDIA NIM AI error:', error?.response?.data || error.message);
    throw new Error(`NVIDIA completion failed: ${error?.response?.data?.detail || error.message}`);
  }
}

export { NVIDIA_MODELS };
