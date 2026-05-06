// src/components/game/QuestionCard.jsx

import styled from "styled-components";
import { motion } from "framer-motion";
import { OptionButton } from "./OptionButton";
import { Mascot } from "./Mascot";

export function QuestionCard({
  shake,
  question,
  combo,
  streak,
  selected,
  status,
  onReplay,
  onAnswer,
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
        x: shake ? [-10, 10, -8, 8, 0] : 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.92,
      }}
    >
      <ComboBadge>x{combo.toFixed(1)}</ComboBadge>
      <Mascot status={status} streak={streak} />
      <ListenButton whileTap={{ scale: 0.95 }} onClick={onReplay}>
        🔊
      </ListenButton>

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

  padding: 34px 24px;

  border-radius: 38px;

  background: rgba(255, 255, 255, 0.75);

  backdrop-filter: blur(18px);

  box-shadow:
    0 20px 80px rgba(80, 65, 150, 0.18),
    0 8px 24px rgba(255, 255, 255, 0.3) inset;

  text-align: center;
`;

const ComboBadge = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;

  padding: 10px 16px;

  border-radius: 999px;

  background: linear-gradient(180deg, #ffe66d, #ffc93c);

  font-weight: 900;
`;

const ListenButton = styled(motion.button)`
  width: 130px;
  height: 130px;

  border-radius: 999px;
  border: 0;

  background: linear-gradient(180deg, #8b73ff, #5c45f5);

  color: white;

  font-size: 52px;

  cursor: pointer;

  box-shadow: 0 24px 50px rgba(92, 69, 245, 0.35);
`;

const QuestionText = styled.h2`
  margin-top: 28px;

  font-size: 30px;

  color: #191442;
`;

const OptionsGrid = styled.div`
  margin-top: 28px;

  display: grid;
  gap: 18px;
`;
