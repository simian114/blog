"use client"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Category } from "@prisma/client"
import * as Popover from "@radix-ui/react-popover"
import { ChevronDown } from "lucide-react"

import ButtonLink from "@/components/button/ButtonLink"
import { RouteWithCategories } from "@/components/layout/header/Header.server"
import { useDevice } from "@/components/providers/deviceWidthProvider"

interface HeaderClientProps {
  routes: RouteWithCategories[]
}

export default function HeaderClient(props: HeaderClientProps) {
  const pathname = usePathname()
  const { isMobile } = useDevice()
  const [openedPopover, setOpenedPopover] = useState<string>("")

  function handleOpenPopover(v: string) {
    setOpenedPopover(v)
  }

  return (
    <ul className="navigation__menus">
      {props.routes.map(route => {
        const selectedRoute =
          pathname !== "/" && pathname.startsWith(`/${route.url}`)
        const openedRoute = route.title === openedPopover

        return (
          <li key={route.id} className={`navigation__menu-item`}>
            <Popover.Root
              onOpenChange={open => open && handleOpenPopover(route.title)}
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
                href={`/${route.url}`}
                key={route.id}
                className={`navigation__menu-link ${
                  selectedRoute ? "active" : ""
                } ${selectedRoute ? "navigation__menu-link--active" : ""}`}
              >
                {route.title}
              </ButtonLink>
              {!isMobile && !!route.categories?.length && (
                <>
                  <Popover.Trigger asChild>
                    <button className="navigation__icon-wrapper">
                      <ChevronDown
                        className={`navigation__icon navigation__icon--${
                          openedRoute ? "open" : "close"
                        }`}
                        width={16}
                        height={16}
                      />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content className="navigation__content" asChild>
                      <ul>
                        {route.categories.map((category: Category) => (
                          <ButtonLink
                            key={category.id}
                            href={`/${route.url}/${category.url}`}
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
        )
      })}
    </ul>
  )
}
