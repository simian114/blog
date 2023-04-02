import { Footer, Header } from "@/components/layout"
import "@styles/globals.scss"
import localFont from "next/font/local"
import { cookies } from "next/headers"
import { Providers } from "./providers"

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
  const cookieStore = cookies()
  const theme = cookieStore.get("theme")
  const bodyThemeClass = !theme?.value ? "" : `${theme.value}-theme`

  return (
    <html lang="en" className={myFont.className}>
      <body className={bodyThemeClass}>
        <div id="app">
          <Providers>
            <Header />
            <section className="inner">{props.children}</section>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
