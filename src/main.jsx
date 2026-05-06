import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { audioManager } from "./audio/audioManager";

import "./index.css";
import App from "./App.jsx";

audioManager.load("correct", "/src/assets/audio/ui/correct.ogg", {
  volume: 0.5,
});

audioManager.load("wrong", "/src/assets/audio/ui/wrong.ogg", {
  volume: 0.5,
});

audioManager.load("combo", "/src/assets/audio/ui/combo.ogg", {
  volume: 0.5,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
