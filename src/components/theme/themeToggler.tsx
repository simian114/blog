import { ReactElement, useEffect, useState } from "react"
import { Theme } from "./themeProvider"
import { useCookies } from "react-cookie"
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"
import { isMachesMediaQuery } from "@/lib/client/mediaQuery.client"

const MEDIA = "(prefers-color-scheme: dark)"

export default function ThemeToggler(): ReactElement {
  const [isMounted, setIsMounted] = useState(false)
  const [cookies, setCookie] = useCookies(["theme"])
  const theme = cookies.theme as Theme
  const [mediaQueryTheme, setMediaQueryTheme] = useState(() => {
    if (typeof window === "undefined") {
      return ""
    }
    return window.matchMedia(MEDIA).matches ? "dark" : "light"
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleThemeToggle = (prevTheme: Theme) => {
    if (typeof window === "undefined") {
      return
    }
    let nextTheme = prevTheme === "dark" ? "light" : "dark"

    if (!prevTheme) {
      const isSystemDarkMode = isMachesMediaQuery(
        "(prefers-color-scheme: dark)"
      )
      nextTheme = isSystemDarkMode ? "light" : "dark"
    }
    setCookie("theme", nextTheme, {
      httpOnly: false, // NOTE: true 면 코드로 수정 불가능
      maxAge: 1000 * 60 * 60 * 24 * 365,
      path: "/",
    })
  }

  useEffect(() => {
    if (!theme) {
      return
    }
    if (theme === "dark") {
      document.body.classList.add("dark-theme")
      document.body.classList.remove("light-theme")
    } else if (theme === "light") {
      document.body.classList.remove("dark-theme")
      document.body.classList.add("light-theme")
    }
  }, [theme])

  const changeMediaQueryHandler = (e: MediaQueryListEvent) => {
    setMediaQueryTheme(e.matches ? "dark" : "light")
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA)
    if (theme) {
      mediaQuery.removeEventListener("change", changeMediaQueryHandler)
      return
    }
    mediaQuery.addEventListener("change", changeMediaQueryHandler)
    return () => {
      mediaQuery.removeEventListener("change", changeMediaQueryHandler)
    }
  }, [theme])

  if (!isMounted) {
    return <button onClick={() => handleThemeToggle(theme)}>...</button>
  }

  if (!theme) {
    return (
      <button onClick={() => handleThemeToggle(theme)}>
        {mediaQueryTheme === "dark" ? <MoonIcon /> : <SunIcon />}
      </button>
    )
  }

  return (
    <button onClick={() => handleThemeToggle(theme)}>
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
