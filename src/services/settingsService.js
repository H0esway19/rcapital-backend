const memory = new Map();

export async function getUserSettings(userId) {
  if (!memory.has(userId)) {
    memory.set(userId, {
      rotationPercent: 15,
      caps: { TSLA: 0.10, XRP: 0.25, AMZN: 0.12 }
    });
  }
  return memory.get(userId);
}

export async function updateUserSettings(userId, update) {
  const current = await getUserSettings(userId);
  const updated = { ...current, ...update };
  memory.set(userId, updated);
  return updated;
}
