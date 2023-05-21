"use client"

import { ReactElement, useEffect, useState } from "react"
import { useThemeActionContext, useThemeStateContext } from "./themeProvider"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ContrastIcon, Loader2Icon, MoonIcon, SunIcon } from "lucide-react"

export default function ThemeSelector(): ReactElement {
  const { theme } = useThemeStateContext()
  const actions = useThemeActionContext()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
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
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={`theme-trigger theme-trigger--${theme}`}>
            <IconComponent
              className={`theme-trigger__icon theme-trigger__icon--${theme}`}
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="theme-content">
            <DropdownMenu.Item asChild>
              <button
                onClick={actions.light}
                className="theme-content__item theme-content__item--light"
              >
                <SunIcon width={16} height={16} />
                <span>Light</span>
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <button
                onClick={actions.dark}
                className="theme-content__item theme-content__item--dark"
              >
                <MoonIcon width={16} height={16} color="yellow" fill="yellow" />
                <span>Dark</span>
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <button
                onClick={actions.system}
                className="theme-content__item theme-content__item--system"
              >
                <ContrastIcon width={16} height={16} />
                <span>System</span>
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className="theme-content__arrow" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  )
}
