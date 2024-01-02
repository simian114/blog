"use client"

// NOTE: clinet-side only
import { usePathname } from "next/navigation"
import { ReactElement, useEffect, useMemo, useRef, useState } from "react"
import { Category, Prisma } from "@prisma/client"
import { RocketIcon } from "@radix-ui/react-icons"
import * as Popover from "@radix-ui/react-popover"
import { ChevronDown } from "lucide-react"

import ButtonLink from "@/components/button/ButtonLink"
import IconButtonLink from "@/components/button/IconButtonLink"
import MagicButtonLink from "@/components/magicButton/ButtonLink"
import { useDevice } from "@/components/providers/deviceWidthProvider"
import { ThemeSelector } from "@/components/theme"
import DisableScroll from "@/components/util/DisableScroll"

import HeaderMobileMenu from "./HeaderMobileMenu"

type RouteWithCategories = Prisma.RouteGetPayload<{
  include: { categories: true }
}>

interface HeaderProps {
  routes: Array<RouteWithCategories>
}

export default function HeaderClient(props: HeaderProps): ReactElement {
  const pathname = usePathname()
  const headerRef = useRef<HTMLHeadElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isMobile } = useDevice()

  const routes = props.routes

  const open = useMemo(
    () => isMobile && isMobileMenuOpen,
    [isMobile, isMobileMenuOpen]
  )

  const [routeMenuOpen, setRouteMenuOpen] = useState(() => {
    return routes.reduce(
      (prev: Record<string, boolean>, cur: RouteWithCategories) => {
        if (!cur.categories?.length) return prev
        return { ...prev, [cur.title]: false }
      },
      {} as Record<string, boolean>
    )
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
            {routes.map((route: RouteWithCategories) => (
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
                            {route.categories.map((category: Category) => (
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
