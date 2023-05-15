import { ReactNode } from "react"
import { openGraphImage } from "../shared-metadata"

export const metadata = {
  title: `Recketman | snippet`,
  description: `코드 조각 모음`,
  openGraph: {
    ...openGraphImage,
    title: "Recketman | snippet",
    description: "코드 조각 모음",
  },
}

export default function SnippetLayout(props: { children: ReactNode }) {
  return <>{props.children}</>
}
