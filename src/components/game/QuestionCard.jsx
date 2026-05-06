// src/components/game/QuestionCard.jsx

import styled from "styled-components";
import { motion } from "framer-motion";
import { OptionButton } from "./OptionButton";
import { SoundOrb } from "./SoundOrb";
import { FloatingScore } from "./FloatingScore";
import { SoundVisualizer } from "./SoundVisualizer";

export function QuestionCard({
  shake,
  question,
  combo,
  streak,
  selected,
  status,
  onReplay,
  onAnswer,
  showPoints,
  isPlaying,
}) {
  return (
    <Card
      initial={{
        opacity: 0,
        scale: 0.92,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        x: shake ? [-6, 6, -5, 5, 0] : 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.92,
      }}
    >
      <ComboBadge>x{combo.toFixed(1)}</ComboBadge>
      <FloatingScore visible={showPoints} value={10} />
      <SoundOrb onClick={onReplay} />
      <SoundVisualizer active={isPlaying} />

      <QuestionText>¿Qué escuchaste?</QuestionText>

      <OptionsGrid>
        {question.options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = option === question.correct;

          return (
            <OptionButton
              key={option}
              onClick={() => onAnswer(option)}
              correct={status === "correct" && isSelected}
              wrong={status === "wrong" && isSelected}
              showCorrectAnswer={status === "wrong" && isCorrect}
              animate={
                status === "correct" && isSelected
                  ? {
                      scale: [1, 1.05, 1],
                    }
                  : {}
              }
            >
              {option}
            </OptionButton>
          );
        })}
      </OptionsGrid>
    </Card>
  );
}

const Card = styled(motion.div)`
  position: relative;

  width: 100%;
  max-width: 430px;

  padding: 58px 28px 34px;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.82);

  backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.55);

  box-shadow: 0 10px 40px rgba(31, 38, 135, 0.08);

  text-align: center;
`;

const ComboBadge = styled.div`
  position: absolute;

  top: 18px;
  right: 18px;

  padding: 8px 14px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.7);

  backdrop-filter: blur(12px);

  border: 1px solid rgba(255, 255, 255, 0.4);

  font-size: 14px;
  font-weight: 700;

  color: #221b4b;
`;

const QuestionText = styled.h2`
  margin-top: 18px;
  font-size: 28px;
  font-weight: 800;

  letter-spacing: -0.5px;

  color: #2c2552;
`;

const OptionsGrid = styled.div`
  margin-top: 28px;

  display: grid;
  gap: 18px;
`;
