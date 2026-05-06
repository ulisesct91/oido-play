// src/components/game/ProgressBar.jsx

import styled from "styled-components";

export function ProgressBar({ progress }) {
  return (
    <Wrapper>
      <Fill
        style={{
          width: `${progress}%`,
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 18px;
  margin-top: 18px;
  border-radius: 999px;
  overflow: hidden;
  background: #e7e2ff;
`;

const Fill = styled.div`
  height: 100%;
  border-radius: 999px;

  background: linear-gradient(90deg, #7b61ff, #5c45f5);

  transition: 0.3s;
`;
