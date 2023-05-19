/* eslint-disable @typescript-eslint/no-explicit-any */
import { Footer, Header } from "@/components/layout"
import "@styles/globals.scss"
import localFont from "next/font/local"
import { Providers } from "./providers"
import { Analytics } from "@vercel/analytics/react"
import "highlight.js/styles/a11y-dark.css"
import { defaultMeta, openGraphImage } from "./shared-metadata"
import { allRoutes, getCategoriesByRoute } from "@/lib/server"
import { ReactNode } from "react"

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

export interface Menu {
  id: string
  href: string
  children: ReactNode
  categories?: string[]
}

const defaultMenus: Menu[] = [
  { id: "archives", children: "archives", href: "/archives" },
  { id: "mdx", children: "mdx", href: "/mdx" },
]
//

function makeMenuByRoutes(routes: string[]) {
  return [
    ...routes.map(
      route =>
        ({
          id: route,
          children: route,
          href: `/${route}`,
          categories: getCategoriesByRoute(route),
        } as Menu)
    ),
    ...defaultMenus,
  ]
}

export default async function RootLayout(props: any) {
  const menus = makeMenuByRoutes(allRoutes)
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
