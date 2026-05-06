// src/pages/GamePage.jsx

import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { vowelsQuestions } from "../data/vowels";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { useAudio } from "../hooks/useAudio";

import { TopHUD } from "../components/game/TopHUD";
import { QuestionCard } from "../components/game/QuestionCard";
import { CelebrationFX } from "../components/game/CelebrationFX";

import {
  buildQuestion,
  calculateDifficulty,
  selectAdaptiveQuestion,
} from "../utils/gameEngine";

export function GamePage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [showConfetti, setShowConfetti] = useState(false);

  const [shakeCard, setShakeCard] = useState(false);

  const {
    score,
    streak,
    combo,
    increaseScore,
    increaseStreak,
    resetGameState,
    stats,
    registerAnswer,
  } = useGameStore();
  const difficulty = calculateDifficulty(streak);

  const { playVoice, playUI } = useAudio();

  const generateQuestion = () => {
    const selectedQuestion = selectAdaptiveQuestion(vowelsQuestions, stats);

    return buildQuestion(selectedQuestion, difficulty);
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
  }, []);

  useEffect(() => {
    if (!currentQuestion) return;

    playVoice(currentQuestion.sound);
  }, [currentQuestion]);

  const progress = ((questionIndex + 1) / vowelsQuestions.length) * 100;

  const nextQuestion = () => {
    const delay = difficulty >= 3 ? 900 : 1300;

    setTimeout(() => {
      setCurrentQuestion(generateQuestion());

      setQuestionIndex((prev) => {
        const next = prev + 1;

        if (next >= vowelsQuestions.length) {
          return 0;
        }

        return next;
      });

      setSelected(null);
      setStatus(null);
    }, delay);
  };

  const handleAnswer = (option) => {
    if (selected) return;

    setSelected(option);

    const isCorrect = option === currentQuestion.correct;
    registerAnswer(currentQuestion.sound, isCorrect);

    if (isCorrect) {
      setStatus("correct");
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 700);

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
      }, 500);

      playUI("wrong");

      resetGameState();
    }

    nextQuestion();
  };

  if (!currentQuestion) return null;

  return (
    <Screen>
      <TopHUD score={score} streak={streak} progress={progress} />

      <GameContainer>
        <CelebrationFX active={showConfetti} />
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            combo={combo}
            selected={selected}
            status={status}
            onReplay={() => playVoice(currentQuestion.sound)}
            onAnswer={handleAnswer}
            streak={streak}
            shake={shakeCard}
          />
        </AnimatePresence>
      </GameContainer>
    </Screen>
  );
}

const Screen = styled.main`
  min-height: 100vh;
  padding: 24px;

  background: radial-gradient(circle at top, #ffffff, #ede8ff);
`;

const GameContainer = styled.div`
  min-height: calc(100vh - 140px);

  display: grid;
  place-items: center;
`;
