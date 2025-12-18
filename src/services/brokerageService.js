export async function connectBrokerage(userId, provider, authCode) {
  return { success: true, provider };
}

export async function listConnectedBrokerages(userId) {
  return [
    { provider: 'robinhood', status: 'connected' },
    { provider: 'coinbase', status: 'connected' }
  ];
}
