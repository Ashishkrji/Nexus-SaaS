import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model.js';
import { logger } from '../config/logger.js';

interface AuthRequest extends Request {
  user?: any;
}

// Plan feature limits configuration
const PLAN_FEATURES: Record<string, {
  maxApiRequests: number;
  maxWorkspaces: number;
  maxTeamMembers: number;
  allowedProviders: string[];
  customDomain: boolean;
  prioritySupport: boolean;
  ssoEnabled: boolean;
  auditLogs: boolean;
}> = {
  FREE: {
    maxApiRequests: 500,
    maxWorkspaces: 1,
    maxTeamMembers: 1,
    allowedProviders: ['nvidia'],
    customDomain: false,
    prioritySupport: false,
    ssoEnabled: false,
    auditLogs: false,
  },
  PRO: {
    maxApiRequests: 25000,
    maxWorkspaces: 10,
    maxTeamMembers: 5,
    allowedProviders: ['nvidia', 'openai', 'anthropic', 'gemini', 'grok'],
    customDomain: true,
    prioritySupport: true,
    ssoEnabled: false,
    auditLogs: false,
  },
  BUSINESS: {
    maxApiRequests: 200000,
    maxWorkspaces: 50,
    maxTeamMembers: 25,
    allowedProviders: ['nvidia', 'openai', 'anthropic', 'gemini', 'grok'],
    customDomain: true,
    prioritySupport: true,
    ssoEnabled: true,
    auditLogs: true,
  },
  AGENCY: {
    maxApiRequests: Infinity,
    maxWorkspaces: Infinity,
    maxTeamMembers: Infinity,
    allowedProviders: ['nvidia', 'openai', 'anthropic', 'gemini', 'grok'],
    customDomain: true,
    prioritySupport: true,
    ssoEnabled: true,
    auditLogs: true,
  },
};

export function getPlanFeatures(plan: string) {
  return PLAN_FEATURES[plan] || PLAN_FEATURES.FREE;
}

// Middleware to check API request limits before processing
export const checkApiLimit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const features = getPlanFeatures(user.plan);
    const currentUsage = user.apiRequestsThisMonth || 0;

    // Reset usage if new month
    const now = new Date();
    const lastReset = user.lastUsageReset ? new Date(user.lastUsageReset) : new Date(0);
    if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
      await User.findByIdAndUpdate(user._id, {
        apiRequestsThisMonth: 0,
        lastUsageReset: now,
      });
      return next();
    }

    if (currentUsage >= features.maxApiRequests) {
      return res.status(429).json({
        message: `Monthly API limit reached (${features.maxApiRequests} requests). Upgrade your plan for more.`,
        currentUsage,
        limit: features.maxApiRequests,
        plan: user.plan,
      });
    }

    next();
  } catch (error) {
    logger.error('Plan check error:', error);
    res.status(500).json({ message: 'Server error checking plan limits' });
  }
};

// Middleware to check if provider is allowed for user's plan
export const checkProviderAccess = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const features = getPlanFeatures(user.plan);
    const requestedProvider = req.body.provider || 'nvidia';

    if (!features.allowedProviders.includes(requestedProvider)) {
      return res.status(403).json({
        message: `Provider '${requestedProvider}' requires ${user.plan === 'FREE' ? 'Pro' : 'a higher'} plan.`,
        allowedProviders: features.allowedProviders,
        plan: user.plan,
      });
    }

    next();
  } catch (error) {
    logger.error('Provider access check error:', error);
    res.status(500).json({ message: 'Server error checking provider access' });
  }
};

export { PLAN_FEATURES };
