import { ReactNode } from "react"

import { openGraphImage } from "../shared-metadata"

export const metadata = {
  title: `Recketman | archives`,
  description: `모든 글 & 스니펫`,
  openGraph: {
    ...openGraphImage,
    title: "Recketman | archives",
    description: "모든 글 & 스니펫",
  },
}

export default function ArchivesLayout(props: { children: ReactNode }) {
  return <>{props.children}</>
}
