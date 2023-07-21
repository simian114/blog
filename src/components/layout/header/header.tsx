"use client"

// NOTE: clinet-side only
import { usePathname } from "next/navigation"
import { ReactElement, useEffect, useMemo, useRef, useState } from "react"
import { RocketIcon } from "@radix-ui/react-icons"
import * as Popover from "@radix-ui/react-popover"
import { ChevronDown } from "lucide-react"

import ButtonLink from "@/components/button/ButtonLink"
import IconButtonLink from "@/components/button/IconButtonLink"
import MagicButtonLink from "@/components/magicButton/ButtonLink"
import { useDevice } from "@/components/providers/deviceWidthProvider"
import { ThemeSelector } from "@/components/theme"
import DisableScroll from "@/components/util/DisableScroll"
import { RouteWithCategories } from "@/types/prisma"

import HeaderMobileMenu from "./_mobileMenu"
interface HeaderProps {
  routes: RouteWithCategories<"id" | "title">[]
}

export default function Header(props: HeaderProps): ReactElement {
  const pathname = usePathname()
  const headerRef = useRef<HTMLHeadElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isMobile } = useDevice()

  const open = useMemo(
    () => isMobile && isMobileMenuOpen,
    [isMobile, isMobileMenuOpen]
  )

  const [routeMenuOpen, setRouteMenuOpen] = useState(() => {
    return props.routes.reduce((prev, cur) => {
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
            {props.routes.map(route => (
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
                    href={`/${route.title}`}
                    key={route.id}
                    className={`navigation__menu-link ${
                      pathname !== "/" && pathname.startsWith(`/${route.title}`)
                        ? "active"
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
                            {route.categories.map(category => (
                              <ButtonLink
                                key={category.id}
                                href={`/${route.title}/${category.title}`}
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
