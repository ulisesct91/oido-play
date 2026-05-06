import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGameStore = create(
  persist(
    (set) => ({
      score: 0,
      streak: 0,
      combo: 1,

      totalAnswers: 0,
      correctAnswers: 0,

      coins: 0,

      stats: {},

      completedSessions: 0,

      increaseScore: () =>
        set((state) => ({
          score: state.score + 10 * state.combo,

          coins: state.coins + 5 * state.combo,
        })),

      increaseStreak: () =>
        set((state) => ({
          streak: state.streak + 1,

          combo: Math.min(state.combo + 0.2, 3),

          totalAnswers: state.totalAnswers + 1,

          correctAnswers: state.correctAnswers + 1,
        })),

      registerWrongAnswer: () =>
        set((state) => ({
          totalAnswers: state.totalAnswers + 1,
        })),

      resetGameState: () =>
        set({
          streak: 0,
          combo: 1,
        }),

      completeSession: () =>
        set((state) => ({
          completedSessions: state.completedSessions + 1,
        })),

      resetSession: () =>
        set({
          score: 0,
          streak: 0,
          combo: 1,
          totalAnswers: 0,
          correctAnswers: 0,
        }),

      registerAnswer: (sound, correct) =>
        set((state) => {
          const current = state.stats[sound] || {
            correct: 0,
            wrong: 0,
          };

          return {
            stats: {
              ...state.stats,

              [sound]: {
                correct: current.correct + (correct ? 1 : 0),

                wrong: current.wrong + (!correct ? 1 : 0),
              },
            },
          };
        }),
    }),

    {
      name: "oido-play-storage",
    },
  ),
);
