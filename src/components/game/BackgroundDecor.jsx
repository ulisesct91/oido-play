import styled from "styled-components";
import { motion } from "framer-motion";

export function BackgroundDecor() {
  return (
    <Orb
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
      }}
    />
  );
}

const Orb = styled(motion.div)`
  position: fixed;

  width: 260px;
  height: 260px;

  top: -80px;
  right: -80px;

  border-radius: 999px;

  background: rgba(123, 97, 255, 0.12);

  filter: blur(100px);

  pointer-events: none;
`;
