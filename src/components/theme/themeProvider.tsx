"use client"

import { getCookie, setCookie } from "@/lib/client/cookie"
import { isMachesMediaQuery } from "@/lib/client/mediaQuery.client"
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react"
import ThemeScript from "./_script"

export type Theme = "" | "light" | "dark" | "system"

export const MEDIA_COLOR_SCHEME = "(prefers-color-scheme: dark)"

interface ThemeStateProviderContextProps {
  theme: Theme
}

interface ThemeActionProviderContextProps {
  light: () => void
  dark: () => void
  system: () => void
}

export interface ThemeProviderProps {
  children: ReactNode
}

// NOTE: 새로 만들어야함.
const ThemeStateProviderContext = createContext<
  undefined | ThemeStateProviderContextProps
>(undefined)

const ThemeActionProviderContext = createContext<
  undefined | ThemeActionProviderContextProps
>(undefined)

export function useThemeStateContext() {
  const context = useContext(ThemeStateProviderContext)
  if (!context) {
    throw new Error(
      "theme context 는 Theme Provider 의 하위 element 에서만 사용할 수 있습니다."
    )
  }
  return {
    ...context,
  }
}

export function useThemeActionContext() {
  const context = useContext(ThemeActionProviderContext)
  if (!context) {
    throw new Error(
      "theme context 는 Theme Provider 의 하위 element 에서만 사용할 수 있습니다."
    )
  }
  return {
    ...context,
  }
}

function ThemeProvider(props: ThemeProviderProps): ReactElement {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light"
    }
    // NOTE: cookie
    const theme = getCookie("theme")
    if (theme && theme !== "system") {
      return theme as Theme
    }
    // NOTE: media query

    return window.matchMedia(MEDIA_COLOR_SCHEME).matches ? "dark" : "light"
  })

  const actions = useMemo(
    () => ({
      light: () => {
        document.body.classList.remove("dark-theme")
        document.body.classList.add("light-theme")
        setCookie("theme", "light")

        setTheme("light")
      },
      dark: () => {
        document.body.classList.remove("light-theme")
        document.body.classList.add("dark-theme")
        setCookie("theme", "dark")
        setTheme("dark")
      },
      system: () => {
        document.body.classList.remove("dark-theme")
        document.body.classList.remove("light-theme")
        setCookie("theme", "system")
        const systemTheme = isMachesMediaQuery(MEDIA_COLOR_SCHEME)
          ? "dark-them"
          : "light-theme"
        document.body.classList.add(systemTheme)
        setTheme("system")
      },
    }),
    []
  )

  return (
    <ThemeStateProviderContext.Provider value={{ theme }}>
      <ThemeActionProviderContext.Provider value={{ ...actions }}>
        <ThemeScript />
        {props.children}
      </ThemeActionProviderContext.Provider>
    </ThemeStateProviderContext.Provider>
  )
}

export default ThemeProvider
