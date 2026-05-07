import styled from "styled-components";
import { motion } from "framer-motion";

export function ProgressResultModal({
  score,
  accuracy,
  passed,
  unlockedLevel,
  requiredAccuracy,
  onRetry,
  onContinue,
  onExit,
}) {
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

        <StatusBadge passed={passed}>
          {passed ? "Nivel completado" : "Sigue practicando"}
        </StatusBadge>

        <RingWrapper>
          <RingBackground />

          <RingProgress accuracy={accuracy} passed={passed} />

          <RingContent>
            <RingLabel>Tu precisión</RingLabel>

            <RingValue>{accuracy}%</RingValue>

            <RingMiniBadge>
              {passed ? "¡Muy bien! 💙" : "Sigue practicando"}
            </RingMiniBadge>
          </RingContent>
        </RingWrapper>

        <Accuracy>Precisión: {accuracy}%</Accuracy>

        {passed ? (
          <>
            <Title>{passed ? "¡Muy bien!" : "Buen intento"}</Title>

            <Subtitle>
              {passed
                ? "Completaste la práctica"
                : "Cada intento mejora tu oído 💙"}
            </Subtitle>

            {unlockedLevel && (
              <UnlockCard>
                🔓 Nuevo nivel desbloqueado
                <UnlockTitle>{unlockedLevel}</UnlockTitle>
              </UnlockCard>
            )}

            <PrimaryButton
              whileTap={{
                scale: 0.98,
              }}
              onClick={onContinue}
            >
              → Continuar
            </PrimaryButton>
          </>
        ) : (
          <>
            <RequirementCard>
              <RequirementIcon>⭐</RequirementIcon>

              <RequirementText>
                Necesitas {requiredAccuracy}% de precisión para desbloquear el
                siguiente nivel.
              </RequirementText>
            </RequirementCard>

            <PrimaryButton
              whileTap={{
                scale: 0.98,
              }}
              onClick={onRetry}
            >
              ↻ Intentar otra vez
            </PrimaryButton>
          </>
        )}

        <SecondaryButton
          whileTap={{
            scale: 0.98,
          }}
          onClick={onExit}
        >
          ⌂ Volver a niveles
        </SecondaryButton>
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

  padding: 32px 28px;

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

const StatusBadge = styled.div`
  width: fit-content;

  margin: auto;

  padding: 10px 18px;

  border-radius: 999px;

  background: ${({ passed }) =>
    passed ? "rgba(80,200,120,0.12)" : "rgba(255,107,107,0.12)"};

  color: ${({ passed }) => (passed ? "#2e8b57" : "#d64545")};

  font-size: 14px;
  font-weight: 700;
`;

const Accuracy = styled.div`
  margin-top: 28px;

  font-size: 20px;
  font-weight: 800;

  color: #2c2552;
`;

const UnlockCard = styled.div`
  margin-top: 24px;

  padding: 18px;

  border-radius: 24px;

  background: rgba(123, 97, 255, 0.08);

  border: 1px solid rgba(123, 97, 255, 0.12);

  color: #5c45f5;

  font-size: 15px;
  font-weight: 700;
`;

const UnlockTitle = styled.div`
  margin-top: 10px;

  font-size: 22px;
  font-weight: 800;
`;

const PrimaryButton = styled(motion.button)`
  width: 100%;

  height: 66px;

  margin-top: 30px;

  border: 0;
  border-radius: 22px;

  background: linear-gradient(180deg, #7b61ff, #5c45f5);

  color: white;

  font-size: 18px;
  font-weight: 700;

  cursor: pointer;

  box-shadow: 0 14px 30px rgba(92, 69, 245, 0.22);
`;

const SecondaryButton = styled(motion.button)`
  width: 100%;

  height: 58px;

  margin-top: 14px;

  border: 0;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.72);

  border: 1px solid rgba(255, 255, 255, 0.5);

  color: #5f5980;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;
`;

const Title = styled.div`
  margin-top: 26px;

  font-size: 52px;
  font-weight: 800;

  letter-spacing: -2px;

  color: #221b4b;
`;

const Subtitle = styled.div`
  margin-top: 10px;

  font-size: 22px;
  font-weight: 600;

  color: #8a84b2;
`;

const RingWrapper = styled.div`
  position: relative;

  width: 280px;
  height: 280px;

  margin: 36px auto 0;
`;

const RingBackground = styled.div`
  position: absolute;
  inset: 0;

  border-radius: 999px;

  border: 18px solid #efebff;
`;

const RingProgress = styled.div`
  position: absolute;
  inset: 0;

  border-radius: 999px;

  border: 18px solid transparent;

  border-top-color: ${({ passed }) => (passed ? "#5c45f5" : "#ff7a7a")};

  border-right-color: ${({ passed }) => (passed ? "#5c45f5" : "#ff7a7a")};

  transform: rotate(${({ accuracy }) => accuracy * 3.6}deg);

  transition: 0.6s;
`;

const RingContent = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RingLabel = styled.div`
  font-size: 20px;
  font-weight: 700;

  color: #6b648f;
`;

const RingValue = styled.div`
  margin-top: 10px;

  font-size: 92px;
  font-weight: 800;

  line-height: 1;

  letter-spacing: -4px;

  color: #221b4b;
`;

const RingMiniBadge = styled.div`
  margin-top: 18px;

  padding: 12px 18px;

  border-radius: 999px;

  background: rgba(123, 97, 255, 0.08);

  color: #5c45f5;

  font-size: 18px;
  font-weight: 700;
`;

const RequirementCard = styled.div`
  display: flex;
  gap: 18px;

  align-items: center;

  margin-top: 36px;

  padding: 20px;

  border-radius: 24px;

  background: rgba(255, 255, 255, 0.7);

  border: 1px solid rgba(123, 97, 255, 0.08);
`;

const RequirementIcon = styled.div`
  width: 54px;
  height: 54px;

  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 215, 0, 0.12);

  font-size: 28px;
`;

const RequirementText = styled.div`
  flex: 1;

  text-align: left;

  font-size: 18px;
  font-weight: 600;

  line-height: 1.5;

  color: #5f5980;
`;
