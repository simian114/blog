"use client"

import { SVGProps } from "react"
import * as Popover from "@radix-ui/react-popover"
import { ContrastIcon, MoonIcon, SunIcon } from "lucide-react"

import { Theme, useSetTheme, useTheme } from "@/store/theme"

import Button, { ButtonDesignProps, ButtonProps } from "../button/Button"
import IconButton from "../button/IconButton"

const buttonCommonDesignProps: Partial<ButtonDesignProps> = {
  size: "xsmall",
  type: "secondary",
}

const buttonCommonProps: Partial<ButtonProps> = {
  style: { justifyContent: "flex-start" },
}

const themes = ["light", "dark", "system"] as Theme[]

export default function ThemeSelector() {
  const [theme] = useTheme()
  const actions = useSetTheme()

  const IconComponent = (
    theme: Theme,
    props?: Partial<SVGProps<SVGSVGElement>>
  ) =>
    theme === "dark" ? (
      <MoonIcon {...props} />
    ) : theme === "light" ? (
      <SunIcon {...props} />
    ) : (
      <ContrastIcon {...props} />
    )

  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <IconButton design={{ size: "medium" }}>
            {IconComponent(theme, {
              className: `theme-trigger__icon theme-trigger__icon--${theme}`,
            })}
          </IconButton>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="theme-content">
            <>
              {themes.map(theme => (
                <Button
                  key={theme}
                  className={`theme-content__item theme-content__item--${theme}`}
                  onClick={() => actions(theme)}
                  {...buttonCommonProps}
                  design={{
                    ...buttonCommonDesignProps,
                    icon: {
                      position: "left",
                      asset: IconComponent(theme, { width: 16, height: 16 }),
                    },
                  }}
                  baseDesign={{ fluid: true }}
                >
                  {theme}
                </Button>
              ))}
            </>
            <Popover.Arrow className="theme-content__arrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  )
}
