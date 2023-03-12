import { ReactElement, useEffect, useState } from "react"
import { Theme } from "./themeProvider"
import { useCookies } from "react-cookie"
import { Utils } from "@/app/client"
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"

// NOTE:
export default function ThemeToggler(): ReactElement {
  const [isMounted, setIsMounted] = useState(false)
  // NOTE: 쿠키를 상태로 관리하기 위해서...
  // NOTE: 상태로 관리한다는 것의 의미는 감지하는 값이 변화하면 컴포넌트를 새로 rendering 한다는것.
  // NOTE: 또한 상태를 effect 의 dps 에 넣음으로써 상태의 변화를 감지하고 특정한 동작 / 값의 변화를 일으킬 수 있다.
  const [cookies, setCookie] = useCookies(["theme"])
  const theme = cookies.theme as Theme

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleThemeToggle = (prevTheme: Theme) => {
    // NOTE: prevTheme 이 없으면 window.matchMediaQuery 를 사용한다.
    let nextTheme = prevTheme === "dark" ? "light" : "dark"

    if (!prevTheme) {
      const isSystemDarkMode = Utils.isMaches("(prefers-color-scheme: dark)")
      nextTheme = isSystemDarkMode ? "light" : "dark"
    }
    setCookie("theme", nextTheme, {
      httpOnly: false, // NOTE: true 면 코드로 수정 불가능
      maxAge: 1000 * 60 * 60 * 24 * 365,
      path: "/",
    })
  }

  // NOTE: cookie 의 변화를 감지
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
  // return <button onClick={() => handleThemeToggle(theme)}>theme toggle!</button>
  if (!isMounted) {
    return <button onClick={() => handleThemeToggle(theme)}>...</button>
  }
  return (
    <button onClick={() => handleThemeToggle(theme)}>
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
