"use client"

import { memo, useEffect } from "react"

import { MEDIA_COLOR_SCHEME, Theme, useSetTheme } from "@/store/theme"

/**
 * 에러가 발생함.. 어떻게 하면 에러 발생하지 않게 만들 수 있을까?
 * 이유: server에서 보내줄 때는 html / body에 theme이 없는데, html을 그리기 전에 여기서 theme값을 바로 넣어줌
 * 따라서 서버에서 보내준 값과 실제 값이 달라서 hydration error가 발생
 */
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
