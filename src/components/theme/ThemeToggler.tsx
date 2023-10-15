import { useCurrentAppliedTheme, useSetTheme, useTheme } from "@/store/theme"

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
  return <button onClick={handleToggle}>current applied theme: {theme}</button>
}
