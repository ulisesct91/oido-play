// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LevelsPage } from "./pages/LevelsPage";
import { GamePage } from "./pages/GamePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/levels" />} />

        <Route path="/levels" element={<LevelsPage />} />

        <Route path="/game/:modeId" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}
