// src/utils/progressionEngine.js

export const progressionMap = {
  vowels: "maFamily",
  maFamily: "paFamily",
};

export function getNextModeToUnlock(modeId) {
  return progressionMap[modeId] || null;
}
