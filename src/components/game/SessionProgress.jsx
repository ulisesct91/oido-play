import styled from "styled-components";

export function SessionProgress({ current, total }) {
  return (
    <Wrapper>
      <Label>
        Pregunta {current} de {total}
      </Label>

      <Dots>
        {Array.from({
          length: total,
        }).map((_, index) => (
          <Dot key={index} active={index < current} />
        ))}
      </Dots>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Label = styled.div`
  font-size: 15px;
  font-weight: 700;

  color: #6b648f;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;

  gap: 8px;

  margin-top: 14px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;

  border-radius: 999px;

  background: ${({ active }) => (active ? "#5c45f5" : "#ddd7f3")};

  transition: 0.2s;
`;
