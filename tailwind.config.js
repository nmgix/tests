const spacedItems = require("tailwindcss-spaced-items");

module.exports = {
  content: ["./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        iris: {
          100: "#5D5FEF",
          200: "#3D3FBF",
        },
        white: "#ffffff",
        outline: {
          100: "#E2E3E5",
          200: "#C4C4C4",
          300: "#6B7280",
        },
        "font-alter": "#4D5562",
        // sky/50
      },
      boxShadow: {
        button: "inset 0 0 0 2px #5D5FEF",
      },
    },
  },
  plugins: [
    spacedItems({
      values: {
        8: "8px",
        16: "16px",
      },
    }),
  ],
};
