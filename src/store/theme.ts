"use client"

import { atom, useAtom, useSetAtom } from "jotai"

import { isMachesMediaQuery } from "@/lib/client/mediaQuery.client"

export type Theme = "" | "light" | "dark" | "system"

export const THEME: { [key in Theme]: Theme } = {
  "": "",
  light: "light",
  dark: "dark",
  system: "system",
}

export const MEDIA_COLOR_SCHEME = "(prefers-color-scheme: dark)"

export const themeAtom = atom("" as Theme)

export const useTheme = () => useAtom(themeAtom)

const setThemeAtom = atom(null, (get, set, theme: Theme) => {
  if (theme === "dark") {
    document.body.classList.remove("light-theme")
    document.body.classList.add("dark-theme")
    window.localStorage.setItem("theme", "dark")
    set(themeAtom, "dark")
  } else if (theme === "light") {
    document.body.classList.remove("dark-theme")
    document.body.classList.add("light-theme")
    window.localStorage.setItem("theme", "light")
    set(themeAtom, "light")
  } else {
    document.body.classList.remove("light-theme")
    document.body.classList.remove("dark-theme")
    window.localStorage.setItem("theme", "system")
    const systemTheme = isMachesMediaQuery(MEDIA_COLOR_SCHEME)
      ? "dark-them"
      : "light-theme"
    document.body.classList.add(systemTheme)
    set(themeAtom, "system")
  }
})

export const useSetTheme = () => useSetAtom(setThemeAtom)
