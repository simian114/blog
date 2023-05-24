"use client"

import Giscus from "@giscus/react"

import { useThemeStateContext } from "../theme/themeProvider"

export default function Comments() {
  const { theme } = useThemeStateContext()

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
