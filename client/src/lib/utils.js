export const ageGenerator = (start, stop) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);
