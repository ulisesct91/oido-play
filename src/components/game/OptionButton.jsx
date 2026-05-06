// src/components/game/OptionButton.jsx

import styled from "styled-components";
import { motion } from "framer-motion";

export function OptionButton({
  children,
  onClick,
  correct,
  wrong,
  showCorrectAnswer,
}) {
  return (
    <Button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      correct={correct}
      wrong={wrong}
      showCorrectAnswer={showCorrectAnswer}
    >
      {children}
    </Button>
  );
}

const Button = styled(motion.button)`
  height: 86px;
  border: 0;
  border-radius: 28px;

  font-size: 30px;
  font-weight: 900;

  cursor: pointer;

  background: ${({ correct, wrong, showCorrectAnswer }) => {
    if (correct) return "#50FA7B";

    if (showCorrectAnswer) {
      return "#50FA7B";
    }

    if (wrong) return "#FF6B6B";

    return "#f4f1ff";
  }};

  color: #191442;

  transition:
    background 0.2s,
    transform 0.15s;
`;
