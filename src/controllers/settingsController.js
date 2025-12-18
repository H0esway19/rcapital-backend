import { getUserSettings, updateUserSettings } from '../services/settingsService.js';

export async function getSettings(req, res, next) {
  try {
    const userId = req.params.userId || 'demo-user';
    res.json(await getUserSettings(userId));
  } catch (err) {
    next(err);
  }
}

export async function updateSettings(req, res, next) {
  try {
    const userId = req.params.userId || 'demo-user';
    const { rotationPercent, caps } = req.body;

    const updated = await updateUserSettings(userId, {
      ...(rotationPercent !== undefined ? { rotationPercent } : {}),
      ...(caps ? { caps } : {})
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}
