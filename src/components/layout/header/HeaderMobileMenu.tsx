"use client"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"

import ButtonLink from "@/components/button/ButtonLink"
import { RouteWithCategories } from "@/components/layout/header/Header.server"
import { useDevice } from "@/components/providers/deviceWidthProvider"
import DisableScroll from "@/components/util/DisableScroll"
import Portal from "@/components/util/Portal"

interface HeaderMobileMenuProps {
  routes: RouteWithCategories[]
}

function HeaderMobileMenu(props: HeaderMobileMenuProps) {
  const pathname = usePathname()
  const headerHeight = useRef<number>()
  const [open, setOpen] = useState(false)
  const { isMobile } = useDevice()

  function toggleMobileMenu() {
    if (!headerHeight.current) {
      const header = document.querySelector("header.header")
      if (!header) return
      headerHeight.current = header.clientHeight
    }
    setOpen(prev => !prev)
  }

  function handleOnClick() {
    setTimeout(() => {
      setOpen(false)
    }, 200)
  }

  if (!isMobile) {
    return null
  }

  return (
    <>
      <DisableScroll enable={open && isMobile} />
      <button
        className="navigation__utils__mobile-menu"
        onClick={toggleMobileMenu}
      >
        <div className={`mobile-menu ${open ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <Portal selector="#app">
        <div
          className={`navigation-panel ${open ? "navigation-panel--open" : ""}`}
          style={{
            ["--header-height" as string]: `${headerHeight.current || 56}px`,
          }}
        >
          <ul>
            {props.routes.map(route => (
              <li key={route.id} className={`navigation__menu-item`}>
                <ButtonLink
                  design={{ type: "secondary" }}
                  baseDesign={{
                    fluid: isMobile,
                    typography: { weight: "medium", variants: "h3" },
                  }}
                  onClick={handleOnClick}
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
              </li>
            ))}
          </ul>
        </div>
      </Portal>
    </>
  )
}

export default HeaderMobileMenu
