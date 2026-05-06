// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Inter, system-ui, sans-serif;
    background: #f6f4ff;
    color: #2c2552;
  }

  button {
    font-family: inherit;
  }
`;
