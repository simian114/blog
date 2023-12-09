import { MoonIcon, SunIcon } from "lucide-react"

import { useCurrentAppliedTheme, useSetTheme } from "@/store/theme"

import IconButton from "../button/IconButton"

export default function ThemeToggler() {
  const theme = useCurrentAppliedTheme()
  const actions = useSetTheme()

  function handleToggle() {
    if (theme === "dark") {
      actions("light")
    } else if (theme === "light") {
      actions("dark")
    }
  }
  return (
    <IconButton onClick={handleToggle}>
      {theme === "dark" ? (
        <MoonIcon style={{ fill: "yellow", color: "yellow" }} />
      ) : (
        <SunIcon style={{ fill: "yellow", color: "yellow" }} />
      )}
    </IconButton>
  )
}
