import { useEffect, useState } from "react";

import {
  calculateDifficulty,
  calculateSpeed,
  buildQuestion,
  selectAdaptiveQuestion,
} from "../utils/gameEngine";

import {
  MIN_ACCURACY_TO_PASS,
  AUDIO_VISUALIZER_DURATION,
  POINTS_FEEDBACK_DURATION,
  CONFETTI_DURATION,
  SHAKE_DURATION,
} from "../config/gameConfig";
import { calculateStars } from "../utils/starRating";

import { getNextModeToUnlock } from "../utils/progressionEngine";

import { useGameStore } from "../store/gameStore";

export function useGameSession({ mode, replayAudio, playUI }) {
  const [questionIndex, setQuestionIndex] = useState(0);

  const [selected, setSelected] = useState(null);

  const [status, setStatus] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [showConfetti, setShowConfetti] = useState(false);

  const [showPoints, setShowPoints] = useState(false);

  const [shakeCard, setShakeCard] = useState(false);

  const [sessionComplete, setSessionComplete] = useState(false);

  const {
    score,
    streak,
    combo,
    stats,
    totalAnswers,
    correctAnswers,

    increaseScore,
    increaseStreak,
    resetGameState,

    registerAnswer,
    registerWrongAnswer,

    resetSession,

    completeSession,
    updateDailyStreak,
    unlockMode,
    saveStars,
  } = useGameStore();

  const difficulty = calculateDifficulty(streak);

  const sessionSpeed = calculateSpeed(streak);

  const SESSION_LENGTH = mode.sessionLength;

  const accuracy =
    totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100);

  const generateQuestion = () => {
    const selectedQuestion = selectAdaptiveQuestion(mode.questions, stats);

    return buildQuestion(selectedQuestion, difficulty);
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
  }, []);

  useEffect(() => {
    if (!currentQuestion) return;

    replayAudio(currentQuestion.sound);
  }, [currentQuestion]);

  const nextQuestion = () => {
    setTimeout(() => {
      if (questionIndex >= SESSION_LENGTH - 1) {
        completeSession();
        const earnedStars = calculateStars(accuracy);

        saveStars(mode.id, earnedStars);

        if (accuracy >= MIN_ACCURACY_TO_PASS) {
          const nextMode = getNextModeToUnlock(mode.id);

          if (nextMode) {
            unlockMode(nextMode);
          }
        }

        updateDailyStreak();

        setSessionComplete(true);

        return;
      }

      setCurrentQuestion(generateQuestion());

      setQuestionIndex((prev) => prev + 1);

      setSelected(null);

      setStatus(null);
    }, sessionSpeed);
  };

  const handleAnswer = (option) => {
    if (selected) return;

    setSelected(option);

    const isCorrect = option === currentQuestion.correct;

    registerAnswer(currentQuestion.sound, isCorrect);

    if (isCorrect) {
      setStatus("correct");

      setShowPoints(true);

      setTimeout(() => {
        setShowPoints(false);
      }, POINTS_FEEDBACK_DURATION);

      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, CONFETTI_DURATION);

      playUI("correct");

      if (combo >= 2) {
        playUI("combo");
      }

      increaseScore();

      increaseStreak();
    } else {
      setStatus("wrong");

      setShakeCard(true);

      setTimeout(() => {
        setShakeCard(false);
      }, SHAKE_DURATION);

      playUI("wrong");

      resetGameState();

      registerWrongAnswer();
    }

    nextQuestion();
  };

  const handleRetry = () => {
    resetSession();

    setQuestionIndex(0);

    setSessionComplete(false);

    setSelected(null);

    setStatus(null);

    setShakeCard(false);

    setShowPoints(false);

    setShowConfetti(false);

    setCurrentQuestion(generateQuestion());
  };

  return {
    currentQuestion,

    selected,
    status,

    sessionComplete,

    showConfetti,
    showPoints,
    shakeCard,

    questionIndex,

    score,
    streak,
    combo,

    accuracy,

    sessionSpeed,

    handleAnswer,
    handleRetry,
  };
}
