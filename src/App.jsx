// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { WelcomePage } from "./pages/WelcomePage";
import { LevelSelectPage } from "./pages/LevelSelectPage";
import { GamePage } from "./pages/GamePage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/levels" element={<LevelSelectPage />} />
        <Route path="/game/:levelId" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
