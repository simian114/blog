import { ReactNode } from "react"

import { openGraphImage } from "@/app/shared-metadata"

export const metadata = {
  title: `Recketman | blog`,
  description: `블로그 글이 올라오는 곳입니다.`,
  openGraph: {
    ...openGraphImage,
    title: "Recketman | blog",
    description: "블로그 글이 올라오는 곳입니다.",
  },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
