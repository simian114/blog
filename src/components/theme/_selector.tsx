"use client"

import { ReactElement, useEffect, useRef, useState } from "react"
import { useThemeActionContext, useThemeStateContext } from "./themeProvider"
import * as Popover from "@radix-ui/react-popover"
import { ContrastIcon, Loader2Icon, MoonIcon, SunIcon } from "lucide-react"

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
        <Popover.Trigger asChild>
          <button className={`theme-trigger theme-trigger--${theme}`}>
            <IconComponent
              className={`theme-trigger__icon theme-trigger__icon--${theme}`}
            />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="theme-content">
            <button
              onClick={actions.light}
              className="theme-content__item theme-content__item--light"
            >
              <SunIcon width={16} height={16} />
              <span>Light</span>
            </button>
            <button
              onClick={actions.dark}
              className="theme-content__item theme-content__item--dark"
            >
              <MoonIcon width={16} height={16} color="yellow" fill="yellow" />
              <span>Dark</span>
            </button>
            <button
              onClick={actions.system}
              className="theme-content__item theme-content__item--system"
            >
              <ContrastIcon width={16} height={16} />
              <span>System</span>
            </button>
            <Popover.Arrow className="theme-content__arrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  )
}
