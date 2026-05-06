import styled from "styled-components";
import { motion } from "framer-motion";

export function SessionCompleteModal({ score, accuracy, onRetry }) {
  const getStars = () => {
    if (accuracy >= 90) return 3;
    if (accuracy >= 70) return 2;

    return 1;
  };

  const stars = getStars();

  return (
    <Overlay>
      <Modal
        initial={{
          opacity: 0,
          scale: 0.82,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 18,
        }}
      >
        <Glow />

        <TopBadge>Sesión completada</TopBadge>

        <ScoreCircle>
          <BigScore>{score}</BigScore>

          <ScoreLabel>puntos</ScoreLabel>
        </ScoreCircle>

        <StarsRow>
          {[...Array(3)].map((_, index) => (
            <Star key={index} active={index < stars}>
              ★
            </Star>
          ))}
        </StarsRow>

        <Accuracy>Precisión: {accuracy}%</Accuracy>

        <Message>
          {accuracy >= 80
            ? "¡Excelente trabajo!"
            : "Cada intento mejora tu oído 💙"}
        </Message>

        <RetryButton
          whileTap={{
            scale: 0.97,
          }}
          onClick={onRetry}
        >
          Jugar otra vez
        </RetryButton>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(17, 12, 40, 0.35);

  backdrop-filter: blur(10px);

  display: grid;
  place-items: center;

  z-index: 100;
`;

const Modal = styled(motion.div)`
  position: relative;

  width: 90%;
  max-width: 420px;

  overflow: hidden;

  padding: 42px 28px;

  border-radius: 36px;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.96),
    rgba(248, 245, 255, 0.92)
  );

  border: 1px solid rgba(255, 255, 255, 0.7);

  text-align: center;

  box-shadow: 0 30px 80px rgba(31, 38, 135, 0.16);
`;

const Glow = styled.div`
  position: absolute;

  width: 220px;
  height: 220px;

  top: -120px;
  left: 50%;

  transform: translateX(-50%);

  border-radius: 999px;

  background: rgba(123, 97, 255, 0.18);

  filter: blur(60px);
`;

const TopBadge = styled.div`
  position: relative;

  width: fit-content;

  margin: auto;

  padding: 10px 18px;

  border-radius: 999px;

  background: rgba(123, 97, 255, 0.1);

  color: #5c45f5;

  font-size: 14px;
  font-weight: 700;
`;

const ScoreCircle = styled.div`
  position: relative;

  width: 170px;
  height: 170px;

  margin: 28px auto 0;

  border-radius: 999px;

  background: linear-gradient(180deg, #7b61ff, #5c45f5);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;

  box-shadow: 0 20px 50px rgba(92, 69, 245, 0.28);
`;

const BigScore = styled.div`
  font-size: 54px;
  font-weight: 800;
`;

const ScoreLabel = styled.div`
  margin-top: 4px;

  font-size: 15px;
  font-weight: 600;

  opacity: 0.85;
`;

const StarsRow = styled.div`
  margin-top: 28px;

  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Star = styled.div`
  font-size: 38px;

  color: ${({ active }) => (active ? "#ffc93c" : "#e3ddff")};

  transition: 0.3s;
`;

const Accuracy = styled.div`
  margin-top: 22px;

  font-size: 18px;
  font-weight: 700;

  color: #2c2552;
`;

const Message = styled.div`
  margin-top: 12px;

  font-size: 16px;
  font-weight: 500;

  color: #6b648f;

  line-height: 1.5;
`;

const RetryButton = styled(motion.button)`
  width: 100%;

  height: 68px;

  margin-top: 34px;

  border: 0;
  border-radius: 22px;

  background: linear-gradient(180deg, #7b61ff, #5c45f5);

  color: white;

  font-size: 18px;
  font-weight: 700;

  cursor: pointer;

  box-shadow: 0 14px 30px rgba(92, 69, 245, 0.22);
`;
