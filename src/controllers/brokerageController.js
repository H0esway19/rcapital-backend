import { connectBrokerage, listConnectedBrokerages } from '../services/brokerageService.js';

export async function postConnectBrokerage(req, res, next) {
  try {
    const userId = req.params.userId || 'demo-user';
    res.json(await connectBrokerage(userId, req.body.provider, req.body.authCode));
  } catch (err) {
    next(err);
  }
}

export async function getBrokerages(req, res, next) {
  try {
    const userId = req.params.userId || 'demo-user';
    res.json(await listConnectedBrokerages(userId));
  } catch (err) {
    next(err);
  }
}

