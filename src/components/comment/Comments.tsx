"use client"

import Giscus from "@giscus/react"
import { useMemo } from "react"
import { useCookies } from "react-cookie"
import { Theme } from "../theme/themeProvider"

const MEDIA = "(prefers-color-scheme: dark)"

export default function Comments() {
  const [cookies] = useCookies(["theme"])

  const theme = useMemo(() => {
    if (typeof window === "undefined") {
      return ""
    }
    if (cookies.theme as Theme) {
      return cookies.theme
    }
    return window.matchMedia(MEDIA).matches ? "dark" : "light"
  }, [cookies.theme])

  return (
    <Giscus
      id="comments"
      repo="simian114/blog"
      repoId="R_kgDOJImHwQ"
      category="General"
      categoryId="DIC_kwDOJImHwc4CWesC"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}
      lang="en"
      loading="lazy"
    />
  )
}
