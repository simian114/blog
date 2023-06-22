import { Meta, StoryObj } from "@storybook/react"
import { SunIcon } from "lucide-react"

import Button from "../../Button"

import ButtonDescription from "./Button.md"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "Components/Button/Button",
  component: Button,
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

export type Story = StoryObj<typeof Button>

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
      <h2>type</h2>
      <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
        <Button design={{ type: "primary" }}>Primary</Button>
        <Button design={{ type: "secondary" }}>secondary</Button>
      </div>
      <h2>size</h2>
      <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
        <Button design={{ size: "xsmall" }}>xsmall</Button>
        <Button design={{ size: "small" }}>small</Button>
        <Button design={{ size: "medium" }}>medium</Button>
        <Button design={{ size: "large" }}>large</Button>
        <Button design={{ size: "xlarge" }}>xlarge</Button>
      </div>
      <h2>icon</h2>
      <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
        <Button design={{ icon: { position: "left", asset: <SunIcon /> } }}>
          Icon Left
        </Button>
        <Button design={{ icon: { position: "right", asset: <SunIcon /> } }}>
          Icon Right
        </Button>
      </div>

      <h2>Also you can use basic design system</h2>
      <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
        <Button
          baseDesign={{
            typography: {
              variants: "h1",
              weight: "regular",
            },
            fluid: true,
          }}
        >
          base design (typography with fluid)
        </Button>
      </div>
    </div>
  ),
}

export const Primary: Story = {
  args: {
    children: "Primary",
    design: {
      type: "primary",
      size: "medium",
    },
  },

  render: args => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Button {...args}>Primary</Button>
    </div>
  ),
}

export const Secondary: Story = {
  args: {
    children: "Secondary",
    design: {
      type: "secondary",
      size: "medium",
    },
  },
  argTypes: {
    design: {
      description: "button design",
    },
  },
}
