"use client"
import { memo } from "react"

const ThemeScript = memo(
  () => {
    const scriptSrc = (() => {
      return `var d=document.body,c=d.classList;var theme=(document.cookie?.split(";")?.find(cookie => cookie.includes("theme"))?.split("=")?.[1])||'';if(theme==='dark'||theme==='light'){c.add(theme==='dark'?'dark-theme':'light-theme');};`
    })()

    return <script dangerouslySetInnerHTML={{ __html: scriptSrc }} />
  },
  () => true
)

ThemeScript.displayName = "ThemeScript"

export default ThemeScript
