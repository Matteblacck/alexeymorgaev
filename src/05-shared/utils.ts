export const fluidText = (max: number, min: number): string => {
  const maxViewportWidth = 1280;
  const minViewportWidth = 360;

  const maxSize = max / 16;
  const minSize = min / 16;
  const maxWidth = maxViewportWidth / 16;
  const minWidth = minViewportWidth / 16;

  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minSize;

  return `clamp(${minSize}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxSize}rem)`;
};

export function rem(pixel: number): string {
  if (typeof pixel === 'number') {
    return `${pixel / 16}rem`; // Конвертируем пиксели в rem, предполагая, что 1rem = 16px
  } else {
    throw new Error('Не используйте единицы измерения при работе с функцией rem(). Передавайте аргументом только числа.');
  }
}