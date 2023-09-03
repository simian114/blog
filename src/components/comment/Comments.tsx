"use client"

import Giscus from "@giscus/react"
import { Post } from "@prisma/client"

import { isMachesMediaQuery } from "@/lib/client/mediaQuery.client"
import { MEDIA_COLOR_SCHEME, useTheme } from "@/store/theme"

// interface CommentsProps {
//   post: Post
// }

export default function Comments() {
  const [theme] = useTheme()
  // props

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
      theme={
        theme === "system"
          ? isMachesMediaQuery(MEDIA_COLOR_SCHEME)
            ? "dark"
            : "light"
          : theme
      }
      lang="en"
      loading="lazy"
    />
  )
}
