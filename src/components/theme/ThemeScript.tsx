"use client"

import { memo, useEffect } from "react"

import { MEDIA_COLOR_SCHEME, Theme, useSetTheme } from "@/store/theme"

const ThemeScript = memo(
  () => {
    const setTheme = useSetTheme()
    useEffect(() => {
      let theme = (window.localStorage?.getItem("theme") || "") as Theme
      setTheme(theme)
      if (!theme) {
        theme = window.matchMedia(MEDIA_COLOR_SCHEME).matches ? "dark" : "light"
      }
      setTheme(theme)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const scriptSrc = (() => {
      return `var d=document.body,c=d.classList;var theme=window?.localStorage.getItem('theme');if(theme==='dark'||theme==='light'){c.add(theme==='dark'?'dark-theme':'light-theme');};`
    })()

    return <script dangerouslySetInnerHTML={{ __html: scriptSrc }} />
  },
  () => true
)

ThemeScript.displayName = "ThemeScript"

export default ThemeScript
