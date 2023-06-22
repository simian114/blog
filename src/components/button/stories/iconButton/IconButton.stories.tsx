import { Meta, StoryObj } from "@storybook/react"
import { MoonIcon } from "lucide-react"

import IconButton from "../../IconButton"

import ButtonDescription from "./IconButton.md"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof IconButton> = {
  title: "Components/Button/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [ButtonDescription].join("\n"),
      },
    },
  },
}

export default meta

export type Story = StoryObj<typeof IconButton>

export const All: Story = {
  render: () => (
    <div
      style={{
        width: "100%",
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <h2>size</h2>
      <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
        <div>
          small
          <IconButton design={{ size: "small" }}>
            <MoonIcon style={{ fill: "pink", color: "pink" }} />
          </IconButton>
        </div>
        <div>
          medium
          <IconButton design={{ size: "medium" }}>
            <MoonIcon style={{ fill: "pink", color: "pink" }} />
          </IconButton>
        </div>
        <div>
          large
          <IconButton design={{ size: "large" }}>
            <MoonIcon style={{ fill: "pink", color: "pink" }} />
          </IconButton>
        </div>
      </div>
    </div>
  ),
}

export const Primary: Story = {
  args: {
    children: "Primary",
    design: {
      size: "medium",
    },
  },

  render: args => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <IconButton {...args}>Primary</IconButton>
    </div>
  ),
}
