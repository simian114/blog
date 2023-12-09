import { Metadata } from "next"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

export const defaultOpenGraph: OpenGraph = { images: "/images/og-image.png" }
export const defaultMeta: Metadata = {
  metadataBase: new URL("https://recketman.vercel.app"),
  title: `Recketman's blog!`,
  description:
    "안녕하세요. sanam 입니다. 방문해주셔서 감사합니다. 해당 블로그는 Next.js 로 만들었습니다.",
  keywords: ["블로그", "Next.js", "React", "blog"],
  // viewport: { width: "device-width", initialScale: 1 },
  creator: "simian114",
  openGraph: {
    title: `Recketman's blog!`,
    description:
      "안녕하세요. sanam 입니다. 방문해주셔서 감사합니다. 해당 블로그는 Next.js 로 만들었습니다.",
    ...defaultOpenGraph,
  },
  other: {
    ["google-site-verification"]: "7TQcAdD6UTznqrsliaYKwBgt8_ooHnzAfkP_M3n0RMA",
  },
}
