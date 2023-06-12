"use client"

import { ReactElement } from "react"
import { Provider as JotaiProvider } from "jotai"

import ThemeScript from "@/components/theme/_script"
import DeviceWidthProvider from "@/store/deviceWidthProvider"

interface ProvidersProps {
  children: JSX.Element[] | JSX.Element
}

export function Providers(props: ProvidersProps): ReactElement {
  return (
    <JotaiProvider>
      <ThemeScript />
      <DeviceWidthProvider>{props.children}</DeviceWidthProvider>
    </JotaiProvider>
  )
}
