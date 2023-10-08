import { ReactElement, useEffect, useMemo, useRef, useState } from "react"
import { RocketIcon } from "@radix-ui/react-icons"

import ButtonLink from "@/components/button/ButtonLink"
import IconButtonLink from "@/components/button/IconButtonLink"
import Skeleton from "@/components/skeleton/Skeleton"
import Typography from "@/components/typography/Typography"

const temp = Array.from({ length: 5 })

export default function HeaderLoading(): ReactElement {
  return (
    <>
      <header className="header">
        <nav className="navigation inner">
          <IconButtonLink
            design={{ size: "large" }}
            href="/"
            className="navigation__home"
          >
            <RocketIcon />
          </IconButtonLink>
          <ul className="navigation__menus">
            {temp.map((_, index) => (
              <li
                key={index}
                className={`navigation__menu-item navigation__menu-item--loading`}
              >
                <Skeleton
                  design={{
                    type: "text",
                    variant: "h3",
                  }}
                />
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}
