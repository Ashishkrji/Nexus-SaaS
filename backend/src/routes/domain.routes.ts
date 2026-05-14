import { Router } from 'express';
import { getDomains, addDomain } from '../controllers/domain.controller.js';

const router = Router();

router.get('/', getDomains);
router.post('/', addDomain);

export default router;
