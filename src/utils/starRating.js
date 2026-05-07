export function calculateStars(accuracy) {
  if (accuracy === 100) {
    return 3;
  }

  if (accuracy >= 85) {
    return 2;
  }

  if (accuracy >= 70) {
    return 1;
  }

  return 0;
}
