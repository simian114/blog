"use client"

import { ReactElement } from "react"
import { ThemeProvider } from "./components/theme"
import { ThemeProviderProps } from "./components/theme/themeProvider"

interface ProvidersProps {
  themeProvider: ThemeProviderProps
}

export function Providers(props: ProvidersProps): ReactElement {
  return <ThemeProvider {...props.themeProvider} />
}
