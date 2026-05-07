export const paFamilyMode = {
  id: "paFamily",

  title: "PA PE PI PO PU",

  sessionLength: 12,

  questions: [
    {
      id: 1,
      sound: "PA",
      correct: "PA",
      distractors: ["BA", "MA", "TA"],
      difficulty: 1,
    },

    {
      id: 2,
      sound: "PE",
      correct: "PE",
      distractors: ["BE", "ME", "TE"],
      difficulty: 1,
    },

    {
      id: 3,
      sound: "PI",
      correct: "PI",
      distractors: ["BI", "MI", "TI"],
      difficulty: 2,
    },

    {
      id: 4,
      sound: "PO",
      correct: "PO",
      distractors: ["BO", "MO", "TO"],
      difficulty: 2,
    },

    {
      id: 5,
      sound: "PU",
      correct: "PU",
      distractors: ["BU", "MU", "TU"],
      difficulty: 3,
    },
  ],
  theme: {
    emoji: "🥁",

    gradient: "linear-gradient(180deg, #ff9b7b, #ff6b57)",

    accent: "#ff6b57",

    background: "linear-gradient(180deg, #fff7f4 0%, #ffe9e2 100%)",
  },
};
