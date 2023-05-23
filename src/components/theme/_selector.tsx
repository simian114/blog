"use client"

import { ReactElement, useEffect, useRef, useState } from "react"
import { useThemeActionContext, useThemeStateContext } from "./themeProvider"
import * as Popover from "@radix-ui/react-popover"
import { ContrastIcon, Loader2Icon, MoonIcon, SunIcon } from "lucide-react"
import Button, { ButtonDesignProps, ButtonProps } from "../button/Button"
import IconButton from "../button/IconButton"

const buttonCommonDesignProps: Partial<ButtonDesignProps> = {
  size: "xsmall",
  type: "secondary",
  fluid: true,
}
const buttonCommonProps: Partial<ButtonProps> = {
  style: { justifyContent: "flex-start" },
}

export default function ThemeSelector(): ReactElement {
  const { theme } = useThemeStateContext()
  const actions = useThemeActionContext()
  const [isMounted, setIsMounted] = useState(false)
  const targetRef = useRef<HTMLElement>()

  useEffect(() => {
    setIsMounted(true)
    const header = document.querySelector("header.header")
    if (!header) return
    targetRef.current = header as unknown as HTMLElement
  }, [])

  if (!isMounted) {
    return (
      <button className="theme-trigger">
        <Loader2Icon className="theme-trigger__icon theme-trigger__icon--loading" />
      </button>
    )
  }

  const IconComponent =
    theme === "dark" ? MoonIcon : theme === "light" ? SunIcon : ContrastIcon

  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton design={{ size: "medium" }}>
            <IconComponent
              className={`theme-trigger__icon theme-trigger__icon--${theme}`}
            />
          </IconButton>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="theme-content">
            <Button
              className="theme-content__item theme-content__item--light"
              onClick={actions.light}
              {...buttonCommonProps}
              design={{
                ...buttonCommonDesignProps,
                icon: {
                  position: "left",
                  asset: <SunIcon width={16} height={16} />,
                },
              }}
            >
              Light
            </Button>
            <Button
              className="theme-content__item theme-content__item--dark"
              onClick={actions.dark}
              {...buttonCommonProps}
              design={{
                ...buttonCommonDesignProps,
                icon: {
                  position: "left",
                  asset: <MoonIcon width={16} height={16} />,
                },
              }}
            >
              Dark
            </Button>
            <Button
              className="theme-content__item theme-content__item--system"
              onClick={actions.system}
              {...buttonCommonProps}
              design={{
                ...buttonCommonDesignProps,
                icon: {
                  position: "left",
                  asset: <ContrastIcon width={16} height={16} />,
                },
              }}
            >
              System
            </Button>
            <Popover.Arrow className="theme-content__arrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  )
}
