"use client"

import Link from "next/link"
import { ReactElement } from "react"
import { RocketIcon } from "@radix-ui/react-icons"
import ThemeToggler from "../theme/themeToggler"

// NOTE: clinet-side only
import { usePathname } from "next/navigation"

const menus = [
  { id: "home", content: <RocketIcon />, href: "/" },
  { id: "blog", content: "blog", href: "/blog" },
  { id: "snippet", content: "snippet", href: "/snippet" },
  { id: "archives", content: "archives", href: "/archives" },
  { id: "mdx-sketch", content: "mdx-sketch", href: "/mdx-sketch" },
]

export default function Nav(): ReactElement {
  const pathname = usePathname()

  return (
    <nav className="navigation">
      <ul className="navigation__menus">
        {menus.map(menu => (
          <li
            key={menu.id}
            className={
              pathname !== "/" && pathname.startsWith(menu.href) ? "active" : ""
            }
          >
            <Link href={menu.href} key={menu.id} prefetch>
              {menu.content}
            </Link>
          </li>
        ))}
      </ul>
      <div className="navigation__utils">
        <ThemeToggler />
      </div>
    </nav>
  )
}
