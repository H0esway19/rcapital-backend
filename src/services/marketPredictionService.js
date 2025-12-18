export function estimateOpenRange(data) {
  if (!data || data.length < 20) return null;

  const closes = data.map(d => d.close);
  const lastClose = closes[closes.length - 1];

  const returns = [];
  for (let i = 1; i < closes.length; i++) {
    returns.push((closes[i] - closes[i - 1]) / closes[i - 1]);
  }

  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, r) => a + (r - mean) ** 2, 0) / returns.length;
  const stdDev = Math.sqrt(variance);

  return {
    lastClose,
    expectedOpenLow: lastClose * (1 + (mean - stdDev)),
    expectedOpenHigh: lastClose * (1 + (mean + stdDev)),
    volatility: stdDev
  };
}
