import { Meta, StoryObj } from "@storybook/react"
import { SunIcon } from "lucide-react"

import ButtonLink from "../../ButtonLink"

import ButtonLinkDescription from "./ButtonLink.stories.md"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ButtonLink> = {
  title: "Components/Button/ButtonLink",
  component: ButtonLink,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [ButtonLinkDescription].join("\n"),
      },
    },
  },
}

export default meta

export type Story = StoryObj<typeof ButtonLink>

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
        <ButtonLink
          href="https://recketman.vercel.app/"
          design={{ type: "primary" }}
        >
          Primary
        </ButtonLink>
        <ButtonLink
          href="https://recketman.vercel.app/"
          design={{ type: "secondary" }}
        >
          secondary
        </ButtonLink>
      </div>
      <h2>size</h2>
      <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
        <ButtonLink
          href="https://recketman.vercel.app/"
          design={{ size: "xsmall" }}
        >
          xsmall
        </ButtonLink>
        <ButtonLink
          href="https://recketman.vercel.app/"
          design={{ size: "small" }}
        >
          small
        </ButtonLink>
        <ButtonLink
          href="https://recketman.vercel.app/"
          design={{ size: "medium" }}
        >
          medium
        </ButtonLink>
        <ButtonLink
          href="https://recketman.vercel.app/"
          design={{ size: "large" }}
        >
          large
        </ButtonLink>
        <ButtonLink
          href="https://recketman.vercel.app/"
          design={{ size: "xlarge" }}
        >
          xlarge
        </ButtonLink>
      </div>
      <h2>icon</h2>
      <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
        <ButtonLink
          href="https://recketman.vercel.app/"
          design={{ icon: { position: "left", asset: <SunIcon /> } }}
        >
          Icon Left
        </ButtonLink>
        <ButtonLink
          href="https://recketman.vercel.app/"
          design={{ icon: { position: "right", asset: <SunIcon /> } }}
        >
          Icon Right
        </ButtonLink>
      </div>

      <h2>Also basic design system</h2>
      <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
        <ButtonLink
          href="https://recketman.vercel.app/"
          baseDesign={{
            typography: {
              variants: "h1",
              weight: "regular",
            },
            fluid: true,
          }}
        >
          base design (typography with fluid)
        </ButtonLink>
      </div>
    </div>
  ),
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Primary",
    href: "https://recketman.vercel.app/",
    design: {
      type: "primary",
      size: "medium",
    },
  },
}

export const Secondary: Story = {
  args: {
    children: "Secondary",
    href: "https://recketman.vercel.app/",
    design: {
      type: "secondary",
    },
  },
  argTypes: {
    design: {
      description: "button design",
    },
  },
}
