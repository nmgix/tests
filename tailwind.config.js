const spacedItems = require("tailwindcss-spaced-items");

module.exports = {
  content: ["./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        iris: {
          100: "#5D5FEF",
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
