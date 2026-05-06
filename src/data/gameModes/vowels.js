export const vowelsMode = {
  id: "vowels",

  title: "Vocales",

  sessionLength: 10,

  questions: [
    {
      id: 1,
      sound: "A",
      correct: "A",
      distractors: ["E", "O", "U"],
      difficulty: 1,
    },

    {
      id: 2,
      sound: "E",
      correct: "E",
      distractors: ["I", "A", "O"],
      difficulty: 1,
    },

    {
      id: 3,
      sound: "I",
      correct: "I",
      distractors: ["E", "U", "O"],
      difficulty: 2,
    },

    {
      id: 4,
      sound: "O",
      correct: "O",
      distractors: ["A", "U", "E"],
      difficulty: 2,
    },

    {
      id: 5,
      sound: "U",
      correct: "U",
      distractors: ["O", "I", "A"],
      difficulty: 3,
    },
  ],
};
