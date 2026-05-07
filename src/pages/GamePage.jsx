// src/pages/GamePage.jsx

import styled from "styled-components";
import { useEffect, useState } from "react";
import { gameModes } from "../data/gameModes";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { useAudio } from "../hooks/useAudio";

import { TopHUD } from "../components/game/TopHUD";
import { QuestionCard } from "../components/game/QuestionCard";
import { CelebrationFX } from "../components/game/CelebrationFX";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  buildQuestion,
  calculateDifficulty,
  selectAdaptiveQuestion,
  calculateSpeed,
} from "../utils/gameEngine";

import { ProgressResultModal } from "../components/game/ProgressResultModal";

import { BackgroundDecor } from "../components/game/BackgroundDecor";

export function GamePage() {
  const { modeId } = useParams();
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [showConfetti, setShowConfetti] = useState(false);

  const [showPoints, setShowPoints] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [shakeCard, setShakeCard] = useState(false);

  const [sessionComplete, setSessionComplete] = useState(false);

  const mode = gameModes[modeId];

  const SESSION_LENGTH = mode.sessionLength;

  const {
    score,
    streak,
    combo,
    increaseScore,
    increaseStreak,
    resetGameState,
    stats,
    registerAnswer,
    totalAnswers,
    correctAnswers,
    registerWrongAnswer,
    resetSession,
    coins,
    completeSession,
    dailyStreak,
    updateDailyStreak,
    unlockMode,
  } = useGameStore();
  const difficulty = calculateDifficulty(streak);
  const sessionSpeed = calculateSpeed(streak);

  const { playVoice, playUI } = useAudio();

  const replayAudio = (sound) => {
    setIsPlaying(true);

    playVoice(sound);

    setTimeout(() => {
      setIsPlaying(false);
    }, 1200);
  };
  const handleExit = () => {
    navigate("/levels");
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

  const handleContinue = () => {
    navigate("/levels");
  };

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

  const progress = Math.min(((questionIndex + 1) / SESSION_LENGTH) * 100, 100);

  const accuracy =
    totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100);
  const MIN_ACCURACY = 70;

  const nextQuestion = () => {
    const delay = sessionSpeed;

    setTimeout(() => {
      if (questionIndex >= SESSION_LENGTH - 1) {
        completeSession();
        if (accuracy >= MIN_ACCURACY) {
          if (mode.id === "vowels") {
            unlockMode("maFamily");
          }

          if (mode.id === "maFamily") {
            unlockMode("paFamily");
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
    }, delay);
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
      }, 650);
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
      registerWrongAnswer();
    }

    nextQuestion();
  };

  if (!currentQuestion) return null;

  return (
    <Screen>
      <BackgroundDecor />
      {sessionComplete && (
        <ProgressResultModal
          requiredAccuracy={MIN_ACCURACY}
          score={score}
          accuracy={accuracy}
          onRetry={handleRetry}
          onContinue={handleContinue}
          onExit={handleExit}
        />
      )}

      <TopHUD
        score={score}
        streak={streak}
        progress={progress}
        coins={coins}
        dailyStreak={dailyStreak}
      />

      <GameContainer>
        <CelebrationFX active={showConfetti} />
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            combo={combo}
            selected={selected}
            status={status}
            onReplay={() => replayAudio(currentQuestion.sound)}
            onAnswer={handleAnswer}
            streak={streak}
            shake={shakeCard}
            showPoints={showPoints}
            isPlaying={isPlaying}
            sessionSpeed={sessionSpeed}
          />
        </AnimatePresence>
      </GameContainer>
    </Screen>
  );
}

const Screen = styled.main`
  min-height: 100vh;
  padding: 24px;

  background: linear-gradient(180deg, #f8f7fc 0%, #f3f0ff 100%);
`;

const GameContainer = styled.div`
  min-height: calc(100vh - 140px);

  display: grid;
  place-items: center;
  padding-top: 32px;
`;
