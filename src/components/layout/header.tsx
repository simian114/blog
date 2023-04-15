"use client"
import Link from "next/link"
import {
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { RocketIcon } from "@radix-ui/react-icons"
import ThemeToggler from "../theme/themeToggler"

// NOTE: clinet-side only
import { usePathname } from "next/navigation"
import { useDevice } from "@/store/deviceWidthProvider"
import DisableScroll from "../client/DisableScroll"
import ButtonLink from "../button/ButtonLink"

interface Menu {
  id: string
  href: string
  children: ReactNode
}

const menus: Menu[] = [
  { id: "blog", children: "blog", href: "/blog" },
  { id: "snippet", children: "snippet", href: "/snippet" },
  { id: "archives", children: "archives", href: "/archives" },
  { id: "mdx-sketch", children: "mdx-sketch", href: "/mdx-sketch" },
]

export default function Nav(): ReactElement {
  const pathname = usePathname()
  const headerRef = useRef<HTMLHeadElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isMobile } = useDevice()
  const open = useMemo(
    () => isMobile && isMobileMenuOpen,
    [isMobile, isMobileMenuOpen]
  )

  function toggleMobileMeun() {
    setIsMobileMenuOpen(prev => !prev)
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
            {menus.map(menu => (
              <li
                key={menu.id}
                className={
                  pathname !== "/" && pathname.startsWith(menu.href)
                    ? "active"
                    : ""
                }
              >
                <Link href={menu.href} key={menu.id}>
                  {menu.children}
                </Link>
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

            <ThemeToggler />
            <button
              className="navigation__utils__mobile-menu"
              onClick={toggleMobileMeun}
            >
              <div className={`mobile-menu ${open ? "open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}
