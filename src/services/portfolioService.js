export async function getUserPortfolio(userId) {
  return {
    userId,
    totalValue: 100000,
    positions: [
      { symbol: 'TSLA', value: 25000 },
      { symbol: 'XRP', value: 15000 },
      { symbol: 'AMZN', value: 12000 },
      { symbol: 'AAPL', value: 18000 },
      { symbol: 'MSFT', value: 20000 }
    ]
  };
}

export async function getAssetHistories(symbols) {
  return symbols.map(s => ({
    symbol: s,
    prices: Array.from({ length: 60 }, (_, i) => 100 + i + Math.random() * 5),
    volumes: [],
    timestamps: []
  }));
}
