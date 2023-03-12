import { createContext, ReactElement, ReactNode, useState } from "react"

export type Theme = "" | "light" | "dark"

interface IThemeProviderContext {
  theme: Theme
}

export interface ThemeProviderProps {
  theme: Theme
  children: ReactNode
}

// NOTE: 새로 만들어야함.
const ThemeProviderContext = createContext<undefined | IThemeProviderContext>(
  undefined
)

function ThemeProvider(props: ThemeProviderProps): ReactElement {
  const [theme] = useState<Theme>(props.theme)

  return (
    <ThemeProviderContext.Provider value={{ theme }}>
      {props.children}
    </ThemeProviderContext.Provider>
  )
}

export default ThemeProvider
