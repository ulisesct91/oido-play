// src/pages/GamePage.jsx

import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { vowelsQuestions } from "../data/vowels";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { useAudio } from "../hooks/useAudio";

import { TopHUD } from "../components/game/TopHUD";
import { QuestionCard } from "../components/game/QuestionCard";

import {
  buildQuestion,
  calculateDifficulty,
  selectAdaptiveQuestion,
} from "../utils/gameEngine";

export function GamePage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(null);

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

  const question = useMemo(() => {
    const selectedQuestion = selectAdaptiveQuestion(vowelsQuestions, stats);

    return buildQuestion(selectedQuestion, difficulty);
  }, [questionIndex, difficulty, stats]);

  useEffect(() => {
    playVoice(question.sound);
  }, [question]);

  const progress = ((questionIndex + 1) / vowelsQuestions.length) * 100;

  const nextQuestion = () => {
    setTimeout(
      () => {
        setSelected(null);
        setStatus(null);

        setQuestionIndex((prev) => {
          const next = prev + 1;

          if (next >= vowelsQuestions.length) {
            return 0;
          }

          return next;
        });
      },
      difficulty >= 3 ? 450 : 700,
    );
  };

  const handleAnswer = (option) => {
    if (selected) return;

    setSelected(option);

    const isCorrect = option === question.correct;
    registerAnswer(question.sound, isCorrect);

    if (isCorrect) {
      setStatus("correct");

      playUI("correct");

      if (combo >= 2) {
        playUI("combo");
      }

      increaseScore();
      increaseStreak();
    } else {
      setStatus("wrong");

      playUI("wrong");

      resetGameState();
    }

    nextQuestion();
  };

  return (
    <Screen>
      <TopHUD score={score} streak={streak} progress={progress} />

      <GameContainer>
        <AnimatePresence mode="wait">
          <QuestionCard
            key={question.id}
            question={question}
            combo={combo}
            selected={selected}
            status={status}
            onReplay={() => playVoice(question.sound)}
            onAnswer={handleAnswer}
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
