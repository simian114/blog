"use client"

import DeviceWidthProvider from "@/store/deviceWidthProvider"
import { memo, ReactElement } from "react"
// import { ThemeProvider } from "../components/theme"
// import { ThemeProviderProps } from "../components/theme/themeProvider"

interface ProvidersProps {
  // themeProvider: ThemeProviderProps
  children: JSX.Element[] | JSX.Element
}

const ThemeScript = memo(
  () => {
    const scriptSrc = (() => {
      return `var d=document.body,c=d.classList;var theme=(document.cookie?.split(";")?.find(cookie => cookie.includes("theme"))?.split("=")?.[1])||'';if(theme){c.add(theme==='dark'?'dark-theme':'light-theme');};`
    })()
    return <script dangerouslySetInnerHTML={{ __html: scriptSrc }} />
  },
  () => true
)
ThemeScript.displayName = "ThemeScript"

export function Providers(props: ProvidersProps): ReactElement {
  return (
    <>
      <DeviceWidthProvider>
        <ThemeScript />
        {props.children}
      </DeviceWidthProvider>
    </>
  )
}
