import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingScore({ visible, value }) {
  return (
    <AnimatePresence>
      {visible && (
        <Score
          initial={{
            opacity: 0,
            y: 10,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: -18,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -36,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          +{value}
        </Score>
      )}
    </AnimatePresence>
  );
}

const Score = styled(motion.div)`
  position: absolute;

  top: 24px;
  left: 50%;

  transform: translateX(-50%);

  font-size: 28px;
  font-weight: 800;

  color: #50c878;

  pointer-events: none;

  text-shadow: 0 4px 12px rgba(80, 200, 120, 0.3);
`;
