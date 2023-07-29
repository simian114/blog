"use client"

import { ReactElement, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as JotaiProvider } from "jotai"

import DeviceWidthProvider from "@/components/providers/deviceWidthProvider"
import ThemeScript from "@/components/theme/_script"

interface ProvidersProps {
  children: JSX.Element[] | JSX.Element
}

export function Providers(props: ProvidersProps): ReactElement {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <JotaiProvider>
      <ThemeScript />
      <DeviceWidthProvider>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </DeviceWidthProvider>
    </JotaiProvider>
  )
}
