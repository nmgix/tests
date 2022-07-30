const path = require("path");

module.exports = {
  stories: ["../components/**/*.stories.mdx", "../components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // "@/": path.resolve(__dirname, ".."),
      "@/components": path.resolve(__dirname, "../components"),
      "@/public": path.resolve(__dirname, "../public"),
      "@/store": path.resolve(__dirname, "../store"),
      "@/styles": path.resolve(__dirname, "../styles"),
    };
    return config;
  },
};
