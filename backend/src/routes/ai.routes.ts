import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { checkApiLimit, checkProviderAccess } from '../middleware/plan.middleware.js';
import {
  runCompletion,
  getAISettings,
  updateAISettings,
  removeApiKey,
  getProviders,
  getUsage,
  updatePlan,
} from '../controllers/ai.controller.js';

const router = Router();

// All routes require authentication
router.use(protect);

// AI Completion (with plan checks)
router.post('/complete', checkApiLimit, checkProviderAccess, runCompletion);

// AI Settings
router.get('/settings', getAISettings);
router.put('/settings', updateAISettings);
router.delete('/settings/key/:provider', removeApiKey);

// Providers & Usage
router.get('/providers', getProviders);
router.get('/usage', getUsage);

// Plan management (demo — production would use Stripe)
router.put('/plan', updatePlan);

export default router;
