// src/components/game/Mascot.jsx

import styled from "styled-components";
import { motion } from "framer-motion";

export function Mascot({ status, streak }) {
  const getFace = () => {
    if (status === "correct") {
      if (streak >= 6) {
        return "🤩";
      }

      return "😄";
    }

    if (status === "wrong") {
      return "🥺";
    }

    if (streak >= 10) {
      return "🔥";
    }

    return "🐶";
  };

  const getMessage = () => {
    if (status === "correct") {
      if (streak >= 6) {
        return "¡Increíble!";
      }

      return "¡Muy bien!";
    }

    if (status === "wrong") {
      return "Inténtalo otra vez 💙";
    }

    if (streak >= 10) {
      return "¡Estás imparable!";
    }

    return "Escucha con atención";
  };

  return (
    <Wrapper
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      <Emoji
        animate={{
          scale: status === "correct" ? [1, 1.15, 1] : 1,
        }}
      >
        {getFace()}
      </Emoji>

      <Message>{getMessage()}</Message>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  margin-bottom: 28px;
`;

const Emoji = styled(motion.div)`
  font-size: 82px;
`;

const Message = styled.div`
  margin-top: 8px;

  font-size: 18px;
  font-weight: 800;

  color: #5b5675;
`;
