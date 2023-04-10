/* eslint-disable @typescript-eslint/no-explicit-any */
import { Footer, Header } from "@/components/layout"
import "@styles/globals.scss"
import localFont from "next/font/local"
import { Providers } from "./providers"

// export const dynamic = "force-static"

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.subset.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.subset.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.subset.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
})

// NOTE: https://beta.nextjs.org/docs/api-reference/metadata#optional-metadata
export const metadata = {
  title: `RocketMan's blog!`,
  description: `Hello world, it's me!`,
  other: {
    // ["view-transition"]: "same-origin",
  },
}

export default async function RootLayout(props: any) {
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
      </body>
    </html>
  )
}
