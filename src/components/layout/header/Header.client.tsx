"use client"

// NOTE: clinet-side only
import { usePathname } from "next/navigation"
import { ReactElement, useEffect, useMemo, useRef, useState } from "react"
import { RocketIcon } from "@radix-ui/react-icons"
import * as Popover from "@radix-ui/react-popover"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown } from "lucide-react"

import ButtonLink from "@/components/button/ButtonLink"
import IconButtonLink from "@/components/button/IconButtonLink"
import MagicButtonLink from "@/components/magicButton/ButtonLink"
import { useDevice } from "@/components/providers/deviceWidthProvider"
import { ThemeSelector } from "@/components/theme"
import DisableScroll from "@/components/util/DisableScroll"
import { wait } from "@/lib/utils"
import { RouteWithCategories } from "@/types/prisma"

import HeaderLoading from "./Header.loading"
import HeaderMobileMenu from "./HeaderMobileMenu"

async function getHeaderRoutes() {
  const currentTime = new Date().getTime()
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/layout/header`
  )
  const afterTime = new Date().getTime()
  if (afterTime - currentTime < 1000) {
    await wait(1000 - (afterTime - currentTime))
  }
  return await res.json()
}

export default function HeaderClient(): ReactElement {
  const pathname = usePathname()
  const headerRef = useRef<HTMLHeadElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isMobile } = useDevice()

  const { data, isLoading } = useQuery<
    RouteWithCategories<"id" | "url" | "title">[]
  >({
    queryKey: ["categories"],
    queryFn: getHeaderRoutes,
  })
  const routes = data || []

  const open = useMemo(
    () => isMobile && isMobileMenuOpen,
    [isMobile, isMobileMenuOpen]
  )

  const [routeMenuOpen, setRouteMenuOpen] = useState(() => {
    return routes.reduce((prev: any, cur: any) => {
      if (!cur.categories?.length) return prev
      return { ...prev, [cur.title]: false }
    }, {} as { [key: string]: boolean })
  })

  function toggleMobileMenu() {
    setIsMobileMenuOpen(prev => !prev)
  }

  function handleOpenChange({ route, open }: { route: string; open: boolean }) {
    setRouteMenuOpen({ ...routeMenuOpen, [route]: open })
  }

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  if (isLoading) {
    return <HeaderLoading />
  }

  return (
    <>
      <DisableScroll enable={open && isMobile} />
      <header
        className="header"
        ref={headerRef}
        data-state={open ? "open" : "close"}
      >
        <nav className="navigation inner">
          <IconButtonLink
            design={{ size: "large" }}
            href="/"
            className="navigation__home"
          >
            <RocketIcon />
          </IconButtonLink>
          <ul
            className="navigation__menus"
            data-state={open ? "open" : "close"}
          >
            {routes.map((route: any) => (
              <li key={route.id} className={`navigation__menu-item`}>
                <Popover.Root
                  onOpenChange={open =>
                    handleOpenChange({ route: route.title, open })
                  }
                >
                  <ButtonLink
                    design={{
                      type: "secondary",
                    }}
                    baseDesign={{
                      fluid: isMobile,
                      typography: {
                        weight: "medium",
                        variants: "h3",
                      },
                    }}
                    href={`/${route.url}`}
                    key={route.id}
                    className={`navigation__menu-link ${
                      pathname !== "/" && pathname.startsWith(`/${route.url}`)
                        ? "active"
                        : ""
                    } ${
                      pathname !== "/" && pathname.startsWith(`/${route.url}`)
                        ? "navigation__menu-link--active"
                        : ""
                    }`}
                  >
                    {route.title}
                  </ButtonLink>
                  {!isMobile && !!route.categories?.length && (
                    <>
                      <Popover.Trigger asChild>
                        <button className="navigation__icon-wrapper">
                          <ChevronDown
                            className={`navigation__icon navigation__icon--${
                              routeMenuOpen[route.title] ? "open" : "close"
                            }`}
                            width={16}
                            height={16}
                          />
                        </button>
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Content
                          className="navigation__content"
                          asChild
                        >
                          <ul>
                            {route.categories.map((category: any) => (
                              <ButtonLink
                                key={category.id}
                                href={`/${route.url}/${category.url}`}
                                design={{
                                  type: "secondary",
                                }}
                                baseDesign={{
                                  fluid: true,
                                  typography: { weight: "medium" },
                                }}
                                style={{ justifyContent: "flex-start" }}
                              >
                                {category.title}
                              </ButtonLink>
                            ))}
                            <Popover.Arrow className="navigation__arrow " />
                          </ul>
                        </Popover.Content>
                      </Popover.Portal>
                    </>
                  )}
                </Popover.Root>
              </li>
            ))}
          </ul>
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
            <HeaderMobileMenu open={open} toggleMobileMenu={toggleMobileMenu} />
          </div>
        </nav>
      </header>
    </>
  )
}
