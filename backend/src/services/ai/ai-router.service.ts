import { AISettings } from '../../models/AISettings.model.js';
import { User } from '../../models/User.model.js';
import { nvidiaComplete } from './nvidia.service.js';
import { openaiComplete } from './openai.service.js';
import { anthropicComplete } from './anthropic.service.js';
import { geminiComplete } from './gemini.service.js';
import { grokComplete } from './grok.service.js';
import { decrypt } from '../../utils/encrypt.js';
import { logger } from '../../config/logger.js';

// Plan-based provider access
const PLAN_PROVIDERS: Record<string, string[]> = {
  FREE:     ['nvidia'],
  PRO:      ['nvidia', 'openai', 'anthropic', 'gemini', 'grok'],
  BUSINESS: ['nvidia', 'openai', 'anthropic', 'gemini', 'grok'],
  AGENCY:   ['nvidia', 'openai', 'anthropic', 'gemini', 'grok'],
};

// Plan-based monthly API request limits
const PLAN_LIMITS: Record<string, number> = {
  FREE:     500,
  PRO:      25000,
  BUSINESS: 200000,
  AGENCY:   Infinity,
};

// Available models per provider
export const PROVIDER_MODELS: Record<string, { name: string; id: string; tier: string }[]> = {
  nvidia: [
    { name: 'Llama 3.1 70B', id: 'llama-3.1-70b', tier: 'free' },
    { name: 'Llama 3.1 8B', id: 'llama-3.1-8b', tier: 'free' },
    { name: 'Mistral 7B', id: 'mistral-7b', tier: 'free' },
    { name: 'Mixtral 8x7B', id: 'mixtral-8x7b', tier: 'free' },
  ],
  openai: [
    { name: 'GPT-4o', id: 'gpt-4o', tier: 'paid' },
    { name: 'GPT-4o Mini', id: 'gpt-4o-mini', tier: 'paid' },
    { name: 'GPT-4 Turbo', id: 'gpt-4-turbo', tier: 'paid' },
  ],
  anthropic: [
    { name: 'Claude 4 Sonnet', id: 'claude-sonnet-4-20250514', tier: 'paid' },
    { name: 'Claude 3.5 Sonnet', id: 'claude-3-5-sonnet-20241022', tier: 'paid' },
    { name: 'Claude 3 Haiku', id: 'claude-3-haiku-20240307', tier: 'paid' },
  ],
  gemini: [
    { name: 'Gemini 2.5 Flash', id: 'gemini-2.5-flash-preview-05-20', tier: 'paid' },
    { name: 'Gemini 2.0 Flash', id: 'gemini-2.0-flash', tier: 'paid' },
    { name: 'Gemini 1.5 Pro', id: 'gemini-1.5-pro', tier: 'paid' },
  ],
  grok: [
    { name: 'Grok 2', id: 'grok-2', tier: 'paid' },
    { name: 'Grok 2 Mini', id: 'grok-2-mini', tier: 'paid' },
  ],
};

export function getProvidersForPlan(plan: string) {
  const allowed = PLAN_PROVIDERS[plan] || PLAN_PROVIDERS.FREE;
  return allowed.map(provider => ({
    provider,
    models: PROVIDER_MODELS[provider] || [],
    available: true,
  }));
}

export function getPlanLimit(plan: string): number {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.FREE;
}

export async function aiComplete(
  prompt: string,
  userId: string,
  options?: { provider?: string; model?: string }
): Promise<{ result: string; provider: string; model: string }> {
  const settings = await AISettings.findOne({ userId });
  const user = await User.findById(userId);

  if (!user) throw new Error('User not found');

  // Check usage limit
  const limit = getPlanLimit(user.plan);
  const currentUsage = user.apiRequestsThisMonth || 0;
  if (currentUsage >= limit) {
    throw new Error(`Monthly API limit reached (${limit} requests). Upgrade your plan for more.`);
  }

  // Determine provider
  const requestedProvider = options?.provider || settings?.defaultProvider || 'nvidia';
  const allowedProviders = PLAN_PROVIDERS[user.plan] || PLAN_PROVIDERS.FREE;

  // Validate plan access
  if (!allowedProviders.includes(requestedProvider)) {
    if (user.plan === 'FREE') {
      // Free plan fallback to NVIDIA
      logger.info(`User ${userId} on FREE plan, falling back to NVIDIA`);
      const result = await nvidiaComplete(prompt, options?.model);
      await incrementUsage(userId);
      return { result, provider: 'nvidia', model: options?.model || 'llama-3.1-70b' };
    }
    throw new Error(`Provider '${requestedProvider}' is not available on your ${user.plan} plan.`);
  }

  const requestedModel = options?.model || settings?.preferredModel;

  // Route to provider
  try {
    let result: string;
    let usedProvider = requestedProvider;
    let usedModel = requestedModel || '';

    switch (requestedProvider) {
      case 'openai': {
        const key = getProviderKey(settings, 'openai');
        usedModel = requestedModel || 'gpt-4o-mini';
        result = await openaiComplete(prompt, key, usedModel);
        break;
      }
      case 'anthropic': {
        const key = getProviderKey(settings, 'anthropic');
        usedModel = requestedModel || 'claude-3-5-sonnet-20241022';
        result = await anthropicComplete(prompt, key, usedModel);
        break;
      }
      case 'gemini': {
        const key = getProviderKey(settings, 'gemini');
        usedModel = requestedModel || 'gemini-1.5-flash';
        result = await geminiComplete(prompt, key, usedModel);
        break;
      }
      case 'grok': {
        const key = getProviderKey(settings, 'grok');
        usedModel = requestedModel || 'grok-2';
        result = await grokComplete(prompt, key, usedModel);
        break;
      }
      case 'nvidia':
      default: {
        usedModel = requestedModel || 'llama-3.1-70b';
        result = await nvidiaComplete(prompt, usedModel);
        usedProvider = 'nvidia';
        break;
      }
    }

    await incrementUsage(userId);
    return { result, provider: usedProvider, model: usedModel };
  } catch (error: any) {
    // Fallback chain: try NVIDIA if premium provider fails
    if (requestedProvider !== 'nvidia') {
      logger.warn(`Provider ${requestedProvider} failed, falling back to NVIDIA: ${error.message}`);
      try {
        const fallbackResult = await nvidiaComplete(prompt);
        await incrementUsage(userId);
        return { result: fallbackResult, provider: 'nvidia', model: 'llama-3.1-70b' };
      } catch (fallbackError) {
        logger.error('NVIDIA fallback also failed:', fallbackError);
        throw new Error('All AI providers failed. Please try again later.');
      }
    }
    throw error;
  }
}

function getProviderKey(settings: any, provider: string): string {
  const encryptedKey = settings?.customKeys?.[provider];
  if (!encryptedKey) {
    // Check environment variable as system-level fallback
    const envKey = {
      openai: process.env.OPENAI_API_KEY,
      anthropic: process.env.ANTHROPIC_API_KEY,
      gemini: process.env.GEMINI_API_KEY,
      grok: process.env.GROK_API_KEY,
    }[provider];

    if (envKey && envKey !== `sk-xxxxxxxxxxxxxxxxxxxx` && !envKey.startsWith('sk-xxx')) {
      return envKey;
    }
    throw new Error(`No API key configured for ${provider}. Add your key in Dashboard → AI Settings.`);
  }
  return decrypt(encryptedKey);
}

async function incrementUsage(userId: string) {
  const now = new Date();
  const user = await User.findById(userId);
  if (!user) return;

  // Reset counter if new month
  const lastReset = user.lastUsageReset ? new Date(user.lastUsageReset) : new Date(0);
  if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
    await User.findByIdAndUpdate(userId, {
      apiRequestsThisMonth: 1,
      lastUsageReset: now,
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      $inc: { apiRequestsThisMonth: 1 },
    });
  }
}
