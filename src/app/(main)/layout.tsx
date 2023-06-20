/* eslint-disable @typescript-eslint/no-explicit-any */
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/react"

import { Route } from "@/app/types"
import { Footer, Header } from "@/components/layout"
import { Providers } from "@/components/providers/providers"
import { defaultMeta, openGraphImage } from "@/constants/metadata"

import "@styles/globals.scss"
import "highlight.js/styles/a11y-dark.css"

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: [
    {
      path: "../../../public/fonts/Pretendard-Regular.subset.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Pretendard-Medium.subset.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Pretendard-Bold.subset.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
})

// NOTE: https://beta.nextjs.org/docs/api-reference/metadata#optional-metadata
export const metadata = {
  ...defaultMeta,
  openGraph: {
    ...defaultMeta,
    ...openGraphImage,
    images: "/images/og-image.png",
  },
  other: {
    ["google-site-verification"]: "7TQcAdD6UTznqrsliaYKwBgt8_ooHnzAfkP_M3n0RMA",
  },
}

async function getData(): Promise<Route[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/route`)
    return await res.json()
  } catch (error) {
    return []
  }
}

export default async function RootLayout(props: any) {
  const menus = await getData()

  return (
    <html lang="en" className={myFont.className} suppressHydrationWarning>
      <body>
        <Providers>
          <div id="app">
            <Header menus={menus} />
            <section className="inner">{props.children}</section>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
