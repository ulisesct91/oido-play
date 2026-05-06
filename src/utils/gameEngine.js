// src/utils/gameEngine.js

export function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function calculateDifficulty(streak) {
  if (streak >= 12) return 3;
  if (streak >= 6) return 2;

  return 1;
}

export function buildQuestion(question, difficulty = 1) {
  let distractorCount = 2;

  if (difficulty >= 2) {
    distractorCount = 3;
  }

  const selectedDistractors = question.distractors.slice(0, distractorCount);

  const options = shuffleArray([question.correct, ...selectedDistractors]);

  return {
    ...question,
    options,
  };
}

export function selectAdaptiveQuestion(questions, stats) {
  if (!stats) {
    return randomQuestion(questions);
  }

  const weightedQuestions = questions.map((question) => {
    const stat = stats[question.sound];

    if (!stat) {
      return {
        question,
        weight: 5,
      };
    }

    const mistakes = stat.wrong || 0;

    return {
      question,
      weight: mistakes + 1,
    };
  });

  weightedQuestions.sort((a, b) => b.weight - a.weight);

  const topQuestions = weightedQuestions.slice(0, 3);

  return randomQuestion(topQuestions.map((item) => item.question));
}

function randomQuestion(array) {
  return array[Math.floor(Math.random() * array.length)];
}
