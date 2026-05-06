export const maFamilyMode = {
  id: "maFamily",

  title: "MA ME MI MO MU",

  sessionLength: 12,

  questions: [
    {
      id: 1,
      sound: "MA",
      correct: "MA",
      distractors: ["ME", "PA", "NA"],
      difficulty: 1,
    },

    {
      id: 2,
      sound: "ME",
      correct: "ME",
      distractors: ["MA", "NE", "PE"],
      difficulty: 1,
    },

    {
      id: 3,
      sound: "MI",
      correct: "MI",
      distractors: ["NI", "ME", "PI"],
      difficulty: 2,
    },

    {
      id: 4,
      sound: "MO",
      correct: "MO",
      distractors: ["NO", "MA", "PO"],
      difficulty: 2,
    },

    {
      id: 5,
      sound: "MU",
      correct: "MU",
      distractors: ["NU", "MO", "PU"],
      difficulty: 3,
    },
  ],
};
