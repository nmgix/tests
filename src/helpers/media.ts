enum Size {
  "320px",
  "375px",
  "425px",
  "524px",
  "768px",
  "1024px",
  "1440px",
  "2560px",
  //   mobileS = "320px",
  //   mobileM = "375px",
  //   mobileL = "425px",
  //   tablet = "768px",
  //   laptop = "1024px",
  //   laptopL = "1440px",
  //   desktop = "2560px",
}

export const Device = (size: keyof typeof Size) => {
  return `(max-width: ${size})`;
};
