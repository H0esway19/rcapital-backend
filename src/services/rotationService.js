import { sma, ema, rsi, macd } from '../utils/indicators.js';

function normalize(v, min, max) {
  if (v == null) return 0;
  return (v - min) / (max - min);
}

export function scoreAsset(assetHistory) {
  const prices = assetHistory.prices;
  if (prices.length < 20) return { symbol: assetHistory.symbol, score: 0 };

  const momentum = (prices[prices.length - 1] - prices[prices.length - 11]) / prices[prices.length - 11];

  const sma20 = sma(prices, 20);
  const rsi14 = rsi(prices, 14);
  const macdVal = macd(prices);

  const momentumScore = normalize(momentum, -0.2, 0.2);
  const rsiScore = rsi14 / 100;
  const macdScore = normalize(macdVal?.histogram || 0, -5, 5);

  const total = 0.4 * momentumScore + 0.3 * rsiScore + 0.3 * macdScore;

  return { symbol: assetHistory.symbol, score: total };
}

export function calculateRotationPlan({ portfolio, histories, settings }) {
  const { totalValue, positions } = portfolio;
  const { rotationPercent, caps } = settings;

  const rotationBudget = (rotationPercent / 100) * totalValue;

  const scored = histories.map(scoreAsset).sort((a, b) => b.score - a.score);

  let remaining = rotationBudget;
  const recs = [];

  const currentAllocMap = {};
  positions.forEach(p => {
    currentAllocMap[p.symbol] = p.value / totalValue;
  });

  for (const asset of scored) {
    if (remaining <= 0) break;
    const cap = caps?.[asset.symbol];
    if (!cap) continue;

    const currentVal = (currentAllocMap[asset.symbol] || 0) * totalValue;
    const maxVal = cap * totalValue;
    const room = maxVal - currentVal;

    if (room > 0) {
      const allocate = Math.min(room, remaining);
      recs.push({ symbol: asset.symbol, buyAmount: allocate, score: asset.score });
      remaining -= allocate;
    }
  }

  return {
    rotationPercent,
    rotationBudget,
    remainingBudget: remaining,
    recommendations: recs,
    rankedAssets: scored
  };
}
