"use client"

import { SessionProvider } from "next-auth/react"
import { ReactElement, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as JotaiProvider } from "jotai"

import DeviceWidthProvider from "@/components/providers/deviceWidthProvider"

import ThemeScript from "../theme/ThemeScript"

interface ProvidersProps {
  children: JSX.Element[] | JSX.Element
}

export function AdminProviders(props: ProvidersProps): ReactElement {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <JotaiProvider>
      <ThemeScript />
      <DeviceWidthProvider>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {props.children}
          </QueryClientProvider>
        </SessionProvider>
        )
      </DeviceWidthProvider>
    </JotaiProvider>
  )
}
