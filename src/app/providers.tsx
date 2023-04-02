"use client"

import DeviceWidthProvider from "@/store/deviceWidthProvider"
import { ReactElement } from "react"
// import { ThemeProvider } from "../components/theme"
// import { ThemeProviderProps } from "../components/theme/themeProvider"

interface ProvidersProps {
  // themeProvider: ThemeProviderProps
  children: JSX.Element[] | JSX.Element
}

export function Providers(props: ProvidersProps): ReactElement {
  return <DeviceWidthProvider>{props.children}</DeviceWidthProvider>
}
