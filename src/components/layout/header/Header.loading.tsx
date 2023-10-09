import { ReactElement } from "react"
import { RocketIcon } from "@radix-ui/react-icons"

import IconButtonLink from "@/components/button/IconButtonLink"
import Skeleton from "@/components/skeleton/Skeleton"

const Routes = Array.from({ length: 4 })
const Utils = Array.from({ length: 2 })

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
            {Routes.map((_, index) => (
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

          <div className="navigation__utils navigation__utils--loading">
            {Utils.map((_, index) => (
              <div key={index} className={``}>
                <Skeleton
                  design={{
                    type: "text",
                    variant: "h3",
                  }}
                />
              </div>
            ))}
          </div>
        </nav>
      </header>
    </>
  )
}
