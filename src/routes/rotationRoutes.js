import { Router } from 'express';
import { getRotationPlan } from '../controllers/rotationController.js';

const router = Router();

router.get('/plan/:userId?', getRotationPlan);

export default router;
