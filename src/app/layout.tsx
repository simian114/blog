import "@styles/globals.scss"
import localFont from "next/font/local"
import { cookies } from "next/headers"
import { Nav } from "./components/layout"

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

export const metadata = {
  title: `RocketMan's blog!`,
  description: `Hello workd, it's me!`,
}

export default async function RootLayout(props: any) {
  const cookieStore = cookies()
  const theme = cookieStore.get("theme")
  const bodyThemeClass = !theme?.value ? "" : `${theme.value}-theme`

  return (
    <html lang="en" className={myFont.className}>
      <body className={bodyThemeClass}>
        <div id="app">
          <Nav />
          {props.children}
          <footer>footer</footer>
        </div>
      </body>
    </html>
  )
}
