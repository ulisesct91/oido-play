import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { audioManager } from "./audio/audioManager";

import "./index.css";
import App from "./App.jsx";

audioManager.load("voice-a", "/src/assets/audio/vowels/a.ogg");

audioManager.load("voice-e", "/src/assets/audio/vowels/e.ogg");

audioManager.load("voice-i", "/src/assets/audio/vowels/i.ogg");

audioManager.load("voice-o", "/src/assets/audio/vowels/o.ogg");

audioManager.load("voice-u", "/src/assets/audio/vowels/u.ogg");

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
