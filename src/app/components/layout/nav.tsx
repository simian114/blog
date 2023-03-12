"use client"

import Link from "next/link"
import { ReactElement } from "react"
import { RocketIcon } from "@radix-ui/react-icons"
import ThemeToggler from "../theme/themeToggler"
import styles from "./nav.module.scss"

// NOTE: clinet-side only
import { usePathname } from "next/navigation"

const menus = [
  { id: "home", content: <RocketIcon />, href: "/" },
  { id: "blog", content: "blog", href: "/blog" },
  { id: "snippet", content: "snippet", href: "/snippet" },
  { id: "archives", content: "archives", href: "/archives" },
]

export default function Nav(): ReactElement {
  const pathname = usePathname()
  return (
    <nav className={styles["navigation"]}>
      <ul className={styles["navigation__menus"]}>
        {menus.map(menu => (
          <li
            className={
              pathname !== "/" && pathname.startsWith(menu.href)
                ? styles.active
                : ""
            }
          >
            <Link href={menu.href} key={menu.id}>
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
