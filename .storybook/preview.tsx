import type { Preview } from "@storybook/react"
import "@styles/globals.scss"
import React from "react"
import ThemeScript from "../src/components/theme/_script"
import { Provider as JotaiProvider } from "jotai"
import { ThemeSelector } from "../src/components/theme"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => (
      <JotaiProvider>
        <ThemeScript />
        <div style={{ marginBottom: "1.5rem" }}>
          <ThemeSelector />
        </div>
        <Story />
      </JotaiProvider>
    ),
  ],
}

export default preview
