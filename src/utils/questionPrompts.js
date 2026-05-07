const prompts = [
  "¿Qué escuchaste?",

  "Escucha y elige",

  "Selecciona el sonido correcto",

  "Toca la opción correcta",

  "¿Cuál sonido escuchaste?",
];

export function getRandomPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)];
}
