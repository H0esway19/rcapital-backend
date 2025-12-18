import { getUserPortfolio } from '../services/portfolioService.js';

export async function getPortfolio(req, res, next) {
  try {
    const userId = req.params.userId || 'demo-user';
    res.json(await getUserPortfolio(userId));
  } catch (err) {
    next(err);
  }
}
