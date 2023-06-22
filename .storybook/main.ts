import type { StorybookConfig } from "@storybook/nextjs"
const path = require("path")

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-pseudo-states",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal(config, options) {
    if (!config.resolve) {
      return config
    }
    config.resolve.alias = {
      ...config.resolve?.alias,
      "@": path.resolve(__dirname, "../src"),
      "@api": path.resolve(__dirname, "../src/app/api"),
      "@styles": path.resolve(__dirname, "../src/styles"),
      "@components": path.resolve(__dirname, "../src/components"),
      "@posts": path.resolve(__dirname, "../src/posts"),
      "@lib": path.resolve(__dirname, "../src/lib"),
      "@types": path.resolve(__dirname, "../src/types"),
      "@constants": path.resolve(__dirname, "../src/constants"),
    }
    return config
  },
  docs: {
    autodocs: "tag",
  },
}
export default config
