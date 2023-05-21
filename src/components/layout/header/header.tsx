"use client"

import Link from "next/link"
import { ReactElement, useEffect, useMemo, useRef, useState } from "react"
import { RocketIcon } from "@radix-ui/react-icons"
import ThemeSelector from "../../theme/_selector"

// NOTE: clinet-side only
import { usePathname } from "next/navigation"
import { useDevice } from "@/store/deviceWidthProvider"
import DisableScroll from "../../client/DisableScroll"
import ButtonLink from "../../button/ButtonLink"
import { Menu } from "@/app/layout"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import HeaderMobileMenu from "./_mobileMenu"
import { ChevronDown } from "lucide-react"
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

  const [routeMenuOpen, setTemp] = useState(() => {
    return props.menus.reduce((prev, cur) => {
      if (!cur.categories?.length) return prev
      return { ...prev, [cur.id]: false }
    }, {} as { [key: string]: boolean })
  })

  function toggleMobileMenu() {
    setIsMobileMenuOpen(prev => !prev)
  }

  function handleOpenChange({ route, open }: { route: string; open: boolean }) {
    setTemp({ ...routeMenuOpen, [route]: open })
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
                <DropdownMenu.Root
                  onOpenChange={open =>
                    handleOpenChange({ route: menu.id, open })
                  }
                >
                  <Link
                    className={`navigation__menu-link ${
                      pathname !== "/" && pathname.startsWith(menu.href)
                        ? "active"
                        : ""
                    }`}
                    href={menu.href}
                    key={menu.id}
                  >
                    {menu.children}
                  </Link>
                  {!isMobile && !!menu.categories?.length && (
                    <>
                      <DropdownMenu.Trigger asChild>
                        <button className="navigation__icon-wrapper">
                          <ChevronDown
                            className={`navigation__icon navigation__icon--${
                              routeMenuOpen[menu.id] ? "open" : "close"
                            }`}
                            width={16}
                            height={16}
                          />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="navigation__content"
                          asChild
                        >
                          <ul>
                            {menu.categories.map(item => (
                              <DropdownMenu.Item
                                className="navigation__content-item"
                                asChild
                                key={item}
                              >
                                <Link href={`/${menu.id}?category=${item}`}>
                                  {item}
                                </Link>
                              </DropdownMenu.Item>
                            ))}
                            <DropdownMenu.Arrow className="navigation__arrow DropdownMenuArrow" />
                          </ul>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </>
                  )}
                </DropdownMenu.Root>
              </li>
            ))}
          </ul>
          <div className="navigation__utils">
            <ButtonLink
              design={{
                style: "default",
                color: "secondary",
                size: "xsmall",
                weight: "bold",
              }}
              href="/resume"
            >
              RESUME
            </ButtonLink>

            <ThemeSelector />
            <HeaderMobileMenu open={open} toggleMobileMenu={toggleMobileMenu} />
          </div>
        </nav>
      </header>
    </>
  )
}
