// src/store/gameStore.js

import { create } from "zustand";

export const useGameStore = create((set) => ({
  score: 0,
  streak: 0,
  combo: 1,

  increaseScore: () =>
    set((state) => ({
      score: state.score + 10 * state.combo,
    })),

  increaseStreak: () =>
    set((state) => ({
      streak: state.streak + 1,
      combo: Math.min(state.combo + 0.2, 3),
    })),

  resetGameState: () =>
    set({
      streak: 0,
      combo: 1,
    }),
}));
