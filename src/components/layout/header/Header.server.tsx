import dynamic from "next/dynamic"
import { ReactElement } from "react"
import { Prisma } from "@prisma/client"
import { RocketIcon } from "@radix-ui/react-icons"

import IconButtonLink from "@/components/button/IconButtonLink"
import HeaderClient from "@/components/layout/header/Header.client"
import MagicButtonLink from "@/components/magicButton/ButtonLink"
import { ThemeSelectorLoading } from "@/components/theme"
import { fetchRouteList } from "@/helpers/data/route"

import HeaderMobileMenu from "./HeaderMobileMenu"

const ThemeSelector = dynamic(
  () => import("@/components/theme").then(mod => mod.ThemeSelector),
  { ssr: false, loading: () => <ThemeSelectorLoading /> }
)

export type RouteWithCategories = Prisma.RouteGetPayload<{
  include: { categories: true }
}>

async function getData() {
  const routes = await fetchRouteList({
    include: { categories: true },
    where: { deletedAt: null, open: true, NOT: { url: "" } },
    orderBy: { priority: "asc" },
  })
  return { routes }
}

export default async function HeaderServer(): Promise<ReactElement> {
  const { routes } = await getData()
  return (
    <>
      <header className="header">
        <nav className="navigation inner">
          <IconButtonLink
            design={{ size: "large" }}
            href="/"
            className="navigation__home"
          >
            <RocketIcon />
          </IconButtonLink>
          <HeaderClient routes={routes} />
          <div className="navigation__utils">
            <MagicButtonLink
              design={{
                style: "default",
                color: "secondary",
                size: "xsmall",
                weight: "bold",
              }}
              href="/resume"
            >
              RESUME
            </MagicButtonLink>
            <ThemeSelector />
            <HeaderMobileMenu routes={routes} />
          </div>
        </nav>
      </header>
    </>
  )
}
