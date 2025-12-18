import { Router } from 'express';
import { getBrokerages, postConnectBrokerage } from '../controllers/brokerageController.js';

const router = Router();

router.get('/:userId?/list', getBrokerages);
router.post('/:userId?/connect', postConnectBrokerage);

export default router;
