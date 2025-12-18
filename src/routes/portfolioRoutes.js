import { Router } from 'express';
import { getPortfolio } from '../controllers/portfolioController.js';

const router = Router();

router.get('/:userId?', getPortfolio);

export default router;
