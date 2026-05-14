import { Request, Response } from 'express';
import { AISettings } from '../models/AISettings.model.js';
import { User } from '../models/User.model.js';
import { aiComplete, getProvidersForPlan, getPlanLimit, PROVIDER_MODELS } from '../services/ai/ai-router.service.js';
import { getPlanFeatures } from '../middleware/plan.middleware.js';
import { encrypt } from '../utils/encrypt.js';
import { logger } from '../config/logger.js';

interface AuthRequest extends Request {
  user?: any;
}

// POST /api/ai/complete — Run AI completion
export const runCompletion = async (req: AuthRequest, res: Response) => {
  try {
    const { prompt, provider, model } = req.body;
    if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

    const result = await aiComplete(prompt, req.user.id, { provider, model });

    res.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    logger.error('AI Completion error:', error.message);
    res.status(error.message.includes('limit') ? 429 : 500).json({
      message: error.message || 'AI completion failed',
    });
  }
};

// GET /api/ai/settings — Get user's AI settings
export const getAISettings = async (req: AuthRequest, res: Response) => {
  try {
    let settings = await AISettings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = await AISettings.create({ userId: req.user.id });
    }

    // Mask API keys for security (only show last 4 chars)
    const maskedKeys: Record<string, string> = {};
    if (settings.customKeys) {
      const keysObj = (settings.customKeys as any).toObject ? (settings.customKeys as any).toObject() : settings.customKeys;
      for (const [provider, key] of Object.entries(keysObj)) {
        if (key && typeof key === 'string') {
          maskedKeys[provider] = '••••••••' + key.slice(-4);
        }
      }
    }

    res.json({
      defaultProvider: settings.defaultProvider,
      preferredModel: settings.preferredModel,
      configuredKeys: maskedKeys,
      hasKey: {
        openai: !!settings.customKeys?.openai,
        anthropic: !!settings.customKeys?.anthropic,
        gemini: !!settings.customKeys?.gemini,
        grok: !!settings.customKeys?.grok,
      },
      autoReply: settings.autoReply,
      replyTone: settings.replyTone,
      language: settings.language,
    });
  } catch (error) {
    logger.error('Get AI settings error:', error);
    res.status(500).json({ message: 'Failed to fetch AI settings' });
  }
};

// PUT /api/ai/settings — Update AI settings
export const updateAISettings = async (req: AuthRequest, res: Response) => {
  try {
    const { defaultProvider, preferredModel, apiKeys, autoReply, replyTone, language } = req.body;

    const updateData: any = {};
    if (defaultProvider) updateData.defaultProvider = defaultProvider;
    if (preferredModel !== undefined) updateData.preferredModel = preferredModel;
    if (autoReply !== undefined) updateData.autoReply = autoReply;
    if (replyTone) updateData.replyTone = replyTone;
    if (language) updateData.language = language;

    // Encrypt and store API keys
    if (apiKeys) {
      for (const [provider, key] of Object.entries(apiKeys)) {
        if (key && typeof key === 'string' && key.trim()) {
          updateData[`customKeys.${provider}`] = encrypt(key.trim());
        }
      }
    }

    const settings = await AISettings.findOneAndUpdate(
      { userId: req.user.id },
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.json({ message: 'AI settings updated', settings: { defaultProvider: settings.defaultProvider, preferredModel: settings.preferredModel } });
  } catch (error) {
    logger.error('Update AI settings error:', error);
    res.status(500).json({ message: 'Failed to update AI settings' });
  }
};

// DELETE /api/ai/settings/key/:provider — Remove an API key
export const removeApiKey = async (req: AuthRequest, res: Response) => {
  try {
    const { provider } = req.params;
    const validProviders = ['openai', 'anthropic', 'gemini', 'grok'];
    if (!validProviders.includes(provider as string)) {
      return res.status(400).json({ message: 'Invalid provider' });
    }

    await AISettings.findOneAndUpdate(
      { userId: req.user.id },
      { $unset: { [`customKeys.${provider}`]: 1 } }
    );

    res.json({ message: `${provider} API key removed` });
  } catch (error) {
    logger.error('Remove API key error:', error);
    res.status(500).json({ message: 'Failed to remove API key' });
  }
};

// GET /api/ai/providers — List available providers for user's plan
export const getProviders = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const providers = getProvidersForPlan(user.plan);
    const allProviders = Object.keys(PROVIDER_MODELS).map(p => ({
      provider: p,
      models: PROVIDER_MODELS[p],
      available: providers.some(ap => ap.provider === p),
      requiresKey: p !== 'nvidia',
    }));

    res.json({
      plan: user.plan,
      providers: allProviders,
    });
  } catch (error) {
    logger.error('Get providers error:', error);
    res.status(500).json({ message: 'Failed to fetch providers' });
  }
};

// GET /api/ai/usage — Get usage stats
export const getUsage = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const limit = getPlanLimit(user.plan);
    const features = getPlanFeatures(user.plan);

    res.json({
      plan: user.plan,
      usage: {
        apiRequests: user.apiRequestsThisMonth || 0,
        limit: limit === Infinity ? 'Unlimited' : limit,
        percentage: limit === Infinity ? 0 : Math.round(((user.apiRequestsThisMonth || 0) / limit) * 100),
        lastReset: user.lastUsageReset,
      },
      features,
    });
  } catch (error) {
    logger.error('Get usage error:', error);
    res.status(500).json({ message: 'Failed to fetch usage data' });
  }
};

// PUT /api/ai/plan — Update user plan (for demo — in production use Stripe webhook)
export const updatePlan = async (req: AuthRequest, res: Response) => {
  try {
    const { plan } = req.body;
    const validPlans = ['FREE', 'PRO', 'BUSINESS', 'AGENCY'];
    if (!validPlans.includes(plan)) {
      return res.status(400).json({ message: 'Invalid plan' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { plan },
      { new: true }
    );

    res.json({
      message: `Plan updated to ${plan}`,
      plan: user?.plan,
    });
  } catch (error) {
    logger.error('Update plan error:', error);
    res.status(500).json({ message: 'Failed to update plan' });
  }
};
