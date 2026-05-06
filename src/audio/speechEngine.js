class SpeechEngine {
  synth = window.speechSynthesis;

  voices = [];

  constructor() {
    this.loadVoices();
  }

  loadVoices() {
    this.voices = this.synth.getVoices();

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    }
  }
  speak(text) {
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const preferredVoices = [
      "Paulina",
      "Monica",
      "Google español",
      "Google español de Estados Unidos",
      "Microsoft Sabina",
      "Microsoft Dalia",
    ];

    let selectedVoice = null;

    for (const preferred of preferredVoices) {
      selectedVoice = this.voices.find((voice) =>
        voice.name.toLowerCase().includes(preferred.toLowerCase()),
      );

      if (selectedVoice) break;
    }

    if (!selectedVoice) {
      selectedVoice = this.voices.find((voice) => voice.lang.startsWith("es"));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = "es-MX";

    utterance.rate = 0.82;

    utterance.pitch = 1.15;

    utterance.volume = 1;

    this.synth.speak(utterance);
  }

  stop() {
    this.synth.cancel();
  }
}

export const speechEngine = new SpeechEngine();
