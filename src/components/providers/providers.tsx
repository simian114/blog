"use client"

import { ReactElement, Suspense, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as JotaiProvider } from "jotai"

import DeviceWidthProvider from "@/components/providers/deviceWidthProvider"
import ThemeScript from "@/components/theme/ThemeScript"

interface ProvidersProps {
  children: JSX.Element[] | JSX.Element
}

export function Providers(props: ProvidersProps): ReactElement {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <JotaiProvider>
      {/* NOTE: 에러 1개 발생.. suspense로 감싸지 않는 경우에는 3개의 에러 발생함  */}
      <Suspense>
        <ThemeScript />
      </Suspense>
      <DeviceWidthProvider>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </DeviceWidthProvider>
    </JotaiProvider>
  )
}
