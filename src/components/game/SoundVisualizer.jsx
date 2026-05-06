import styled from "styled-components";
import { motion } from "framer-motion";

const bars = [1, 2, 3, 4, 5];

export function SoundVisualizer({ active }) {
  return (
    <Wrapper>
      {bars.map((bar) => (
        <Bar
          key={bar}
          animate={
            active
              ? {
                  height: [14, 42, 18, 34, 14],
                }
              : {
                  height: 14,
                }
          }
          transition={{
            duration: 0.9 + bar * 0.08,

            repeat: Infinity,
          }}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  gap: 8px;

  height: 52px;

  margin-top: 22px;
`;

const Bar = styled(motion.div)`
  width: 8px;

  border-radius: 999px;

  background: linear-gradient(180deg, #9f8bff, #5c45f5);

  box-shadow: 0 4px 12px rgba(92, 69, 245, 0.18);
`;
