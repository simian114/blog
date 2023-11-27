/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/react"

import { Footer, Header } from "@/components/layout"
import { Providers } from "@/components/providers/providers"
import { defaultMeta } from "@/constants/metadata"

import "@styles/globals.scss"

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

export const metadata: Metadata = {
  ...defaultMeta,
}

export default async function BespokeRootLayout(props: any) {
  return (
    <html lang="en" className={myFont.className} suppressHydrationWarning>
      <body>
        <Providers>
          <div id="app">
            <Header />
            <section className="inner">{props.children}</section>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
