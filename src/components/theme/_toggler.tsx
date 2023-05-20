"use client"

import { ReactElement, useEffect, useState } from "react"
import { useThemeActionContext, useThemeStateContext } from "./themeProvider"
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"

export default function ThemeToggler(): ReactElement {
  const { theme } = useThemeStateContext()
  const actions = useThemeActionContext()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleThemeToggle = (): void => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    actions[nextTheme]()
  }

  if (!isMounted) {
    return <button>...</button>
  }

  return (
    <>
      <button onClick={handleThemeToggle}>
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </button>
    </>
  )
}
