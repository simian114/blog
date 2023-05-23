"use client"

import Link from "next/link"
import { ReactElement, useEffect, useMemo, useRef, useState } from "react"
import { RocketIcon } from "@radix-ui/react-icons"
import ThemeSelector from "../../theme/_selector"

// NOTE: clinet-side only
import { usePathname } from "next/navigation"
import { useDevice } from "@/store/deviceWidthProvider"
import DisableScroll from "../../client/DisableScroll"
import { Menu } from "@/app/layout"
import * as Popover from "@radix-ui/react-popover"
import HeaderMobileMenu from "./_mobileMenu"
import { ChevronDown } from "lucide-react"
import MagicButtonLink from "@/components/magicButton/ButtonLink"
import ButtonLink from "@/components/button/ButtonLink"
interface HeaderProps {
  menus: Menu[]
}

// NOTE: pc / mobile 분리하기

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
    return props.menus.reduce((prev, cur) => {
      if (!cur.categories?.length) return prev
      return { ...prev, [cur.id]: false }
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
          <Link className="navigation__home" href="/">
            <RocketIcon />
          </Link>
          <ul
            className="navigation__menus"
            data-state={open ? "open" : "close"}
          >
            {props.menus.map(menu => (
              <li key={menu.id} className={`navigation__menu-item`}>
                <Popover.Root
                  onOpenChange={open =>
                    handleOpenChange({ route: menu.id, open })
                  }
                >
                  <ButtonLink
                    design={{
                      type: "secondary",
                      fluid: isMobile,
                      typography: {
                        weight: "medium",
                        variants: "h3",
                      },
                    }}
                    href={menu.href}
                    key={menu.id}
                    className={`navigation__menu-link ${
                      pathname !== "/" && pathname.startsWith(menu.href)
                        ? "active"
                        : ""
                    }`}
                  >
                    {menu.children}
                  </ButtonLink>
                  {!isMobile && !!menu.categories?.length && (
                    <>
                      <Popover.Trigger asChild>
                        <button className="navigation__icon-wrapper">
                          <ChevronDown
                            className={`navigation__icon navigation__icon--${
                              routeMenuOpen[menu.id] ? "open" : "close"
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
                            {menu.categories.map(item => (
                              <ButtonLink
                                key={item}
                                href={`/${menu.id}?category=${item}`}
                                design={{
                                  type: "secondary",
                                  fluid: true,
                                  typography: { weight: "medium" },
                                }}
                                style={{ justifyContent: "flex-start" }}
                              >
                                {item}
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
