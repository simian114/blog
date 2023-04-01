"use client"
import Link from "next/link"
import { ReactElement, ReactNode, useRef } from "react"
import { RocketIcon } from "@radix-ui/react-icons"
import ThemeToggler from "../theme/themeToggler"

// NOTE: clinet-side only
import { usePathname } from "next/navigation"

interface Menu {
  id: string
  href: string
  children: ReactNode
}

const menus: Menu[] = [
  { id: "home", children: <RocketIcon />, href: "/" },
  { id: "blog", children: "blog", href: "/blog" },
  { id: "snippet", children: "snippet", href: "/snippet" },
  { id: "archives", children: "archives", href: "/archives" },
  { id: "mdx-sketch", children: "mdx-sketch", href: "/mdx-sketch" },
]

export default function Nav(): ReactElement {
  const pathname = usePathname()
  const headerRef = useRef<HTMLHeadElement>(null)

  return (
    <header className="header" ref={headerRef}>
      <nav className="navigation inner">
        <ul className="navigation__menus">
          {menus.map(menu => (
            <li
              key={menu.id}
              className={
                pathname !== "/" && pathname.startsWith(menu.href)
                  ? "active"
                  : ""
              }
            >
              <Link href={menu.href} key={menu.id} prefetch>
                {menu.children}
              </Link>
            </li>
          ))}
        </ul>
        <div className="navigation__utils">
          <ThemeToggler />
        </div>
      </nav>
    </header>
  )
}
