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
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/": path.resolve(__dirname, "../"),
    };
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
