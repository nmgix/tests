enum Size {
  "320px",
  "375px",
  "425px",
  "524px",
  "768px",
  "1024px",
  "1440px",
  "2560px",
}

export const Device = (size: keyof typeof Size) => {
  return `(max-width: ${size})`;
};
