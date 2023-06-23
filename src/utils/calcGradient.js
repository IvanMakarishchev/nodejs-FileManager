export const calcGradient = (i, count) => {
  const step = 1530 / count;
  const currValue = Math.round(step * i);
  let [R, G, B] = [0, 0, 0];
  if (currValue <= 255) {
    R = 255;
    G = currValue;
    B = 0;
  }
  if (currValue > 255 && currValue <= 510) {
    R = 510 - currValue;
    G = 255;
    B = 0;
  }
  if (currValue > 510 && currValue <= 765) {
    R = 0;
    G = 255;
    B = currValue - 510;
  }
  if (currValue > 765 && currValue <= 1020) {
    R = 0;
    G = 1020 - currValue;
    B = 255;
  }
  if (currValue > 1020 && currValue <= 1275) {
    R = currValue - 1020;
    G = 0;
    B = 255;
  }
  if (currValue > 1275 && currValue <= 1530) {
    R = 255;
    G = 0;
    B = 1530 - currValue;
  }
  return `${R};${G};${B}`;
}