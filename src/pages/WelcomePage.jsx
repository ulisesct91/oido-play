// src/pages/WelcomePage.jsx
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Screen>
      <Card initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <Mascot>🐶</Mascot>

        <Title>OídoPlay</Title>
        <Subtitle>Aprende a oír, juega y mejora</Subtitle>

        <Feature>🔊 Escucha</Feature>
        <Feature>🧠 Aprende</Feature>
        <Feature>✅ Responde</Feature>
        <Feature>⭐ Gana recompensas</Feature>

        <PrimaryButton onClick={() => navigate("/levels")}>Jugar</PrimaryButton>
      </Card>
    </Screen>
  );
}

const Screen = styled.main`
  min-height: 100vh;
  padding: 24px;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #f8f7ff, #ede8ff);
`;

const Card = styled(motion.section)`
  width: 100%;
  max-width: 390px;
  min-height: 680px;
  padding: 32px 24px;
  border-radius: 32px;
  background: white;
  box-shadow: 0 20px 50px rgba(80, 65, 150, 0.16);
  text-align: center;
`;

const Mascot = styled.div`
  font-size: 88px;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 44px;
  color: #5c45f5;
`;

const Subtitle = styled.p`
  margin: 8px 0 32px;
  color: #4f4a73;
  font-size: 17px;
`;

const Feature = styled.div`
  margin: 12px 0;
  padding: 14px 16px;
  border-radius: 18px;
  background: #f3f0ff;
  text-align: left;
  font-weight: 700;
`;

const PrimaryButton = styled.button`
  width: 100%;
  margin-top: 32px;
  padding: 18px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffe66d, #ffc93c);
  color: #191442;
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(255, 201, 60, 0.35);

  &:active {
    transform: scale(0.98);
  }
`;
