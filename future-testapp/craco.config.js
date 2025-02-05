const path = require("path");
const { compilerOptions } = require("./tsconfig.path.json");

module.exports = {
  webpack: {
    alias: {
      "@store": path.resolve(__dirname, "src/redux"),
      "@components": path.resolve(__dirname, "src/components"),
      "@appTypes": path.resolve(__dirname, "src/appTypes"),
      "@resources": path.resolve(__dirname, "src/resources"),
    },
  },
};
