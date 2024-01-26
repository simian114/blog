"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Prisma } from "@prisma/client"
import { Command, CommandDialog } from "cmdk"
import {
  ArrowRightToLine,
  Book,
  ContrastIcon,
  FolderOpen,
  MoonIcon,
  SunIcon,
} from "lucide-react"

import Button from "@/components/button/Button"
import IconButton from "@/components/button/IconButton"
import { CommandMenuRoute } from "@/components/commandMenu/CommandMenu.server"
import Typography from "@/components/typography/Typography"
import { getPostURL } from "@/helpers/model/post"
import { capitalizeFirstLetter } from "@/lib/utils"
import { Theme, useSetTheme, useTheme } from "@/store/theme"

interface CommandMenuClientProps {
  routes: CommandMenuRoute[]
}

// NOTE: 처음에는

type Page = {
  name: string
} & (
  | {
      type: "route"
    }
  | {
      type: "category"
      category: Prisma.CategoryGetPayload<{
        include: { posts: true; route: true }
      }>
    }
)

const themes: Theme[] = ["light", "dark", "system"]

export default function CommandMenuClient(props: CommandMenuClientProps) {
  const router = useRouter()

  const commandRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [pages, setPages] = useState<Page[]>([{ name: "route", type: "route" }])
  const activePage = pages[pages.length - 1]
  const isHome = activePage.type === "route"

  // NOTE: Toggle the menu when ⌘K or ctrl+K(windows) is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  function setCategoryPage({
    routeID,
    categoryID,
  }: {
    routeID: number
    categoryID: number
  }) {
    const route = props.routes.find(route => route.id === routeID)
    const selectedCategory = route?.categories.find(
      category => category.id === categoryID
    )

    if (!route || !selectedCategory) {
      return
    }
    setPages([
      ...pages,
      {
        name: selectedCategory.title,
        type: "category",
        category: { ...selectedCategory, route },
      },
    ])
  }

  const popPage = useCallback(() => {
    setPages(pages => {
      const x = [...pages]
      x.splice(-1, 1)
      return x
    })
  }, [])

  function bounce() {
    if (commandRef.current) {
      commandRef.current.style.transform = "scale(0.96)"
      setTimeout(() => {
        if (commandRef.current) {
          commandRef.current.style.transform = ""
        }
      }, 100)

      setInputValue("")
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      bounce()
    }
    if (e.key === "Escape") {
      if (pages.length > 1) {
        popPage()
        return
      }
      setOpen(false)
      return
    }

    if (isHome || inputValue.length) {
      return
    }

    if (e.key === "Backspace") {
      e.preventDefault()
      popPage()
      bounce()
    }
  }

  const allPosts = useMemo(() => {
    return props.routes.flatMap(route => {
      return route.categories.flatMap(category => {
        return category.posts.map(post => ({ ...post, category, route }))
      })
    })
  }, [props.routes])

  // NOTE: tag 페이지도 만들까?
  return (
    <>
      <Button
        className={`command-menu-button ${
          open ? "command-menu-button--open" : ""
        }`}
        design={{ size: "small", type: "secondary" }}
        baseDesign={{ typography: { variants: "body2" } }}
        onClick={() => setOpen(true)}
      >
        Search...
        <Typography as="kbd" variants="caption1">
          ⌘ K
        </Typography>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bespoke">
          <Command ref={commandRef} onKeyDown={onKeyDown}>
            <div cmdk-raycast-top-shine="" />
            <Command.Input
              ref={inputRef}
              autoFocus
              placeholder="어떤걸 찾고 싶으신가요?"
              onValueChange={setInputValue}
            />
            <hr cmdk-raycast-loader="" />
            <Command.List>
              <Command.Empty>No results found.</Command.Empty>

              {activePage.type === "route" &&
                props.routes.map(route => (
                  <Command.Group
                    key={route.id}
                    heading={capitalizeFirstLetter(route.title)}
                  >
                    <Command.Item
                      value={capitalizeFirstLetter(route.title)}
                      onSelect={() => {
                        router.push(`/${route.url}`)
                        setOpen(false)
                      }}
                    >
                      <ArrowRightToLine />
                      {capitalizeFirstLetter(route.title)}
                      <span cmdk-raycast-meta="">Route</span>
                    </Command.Item>
                    {route.categories.map(category => (
                      <Command.Item
                        key={category.id}
                        value={category.title}
                        onSelect={() =>
                          setCategoryPage({
                            routeID: route.id,
                            categoryID: category.id,
                          })
                        }
                      >
                        <FolderOpen />
                        {capitalizeFirstLetter(category.title)}

                        <span cmdk-raycast-meta="">Category</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              {activePage.type === "category" && (
                <Command.Group
                  heading={
                    <div>
                      {capitalizeFirstLetter(
                        activePage.category.route?.title || ""
                      )}
                      {" > "}
                      {capitalizeFirstLetter(activePage.category.title)}
                    </div>
                  }
                >
                  <Command.Item
                    value={capitalizeFirstLetter(activePage.category.title)}
                    onSelect={() => {
                      const route = props.routes.find(route =>
                        route.categories.find(
                          category => category.id === activePage.category.id
                        )
                      )
                      if (!route) {
                        return
                      }
                      router.push(`/${route.url}/${activePage.category.url}`)
                      setOpen(false)
                    }}
                  >
                    <ArrowRightToLine />
                    {capitalizeFirstLetter(activePage.category.title)}
                    <span cmdk-raycast-meta="">Category</span>
                  </Command.Item>
                  {activePage.category.posts.map(post => (
                    <Command.Item
                      key={post.id}
                      value={capitalizeFirstLetter(post.title)}
                      onSelect={() => {
                        router.push(
                          `/${activePage.category?.route?.url || ""}/${
                            activePage.category.url
                          }/${post.url}`
                        )
                        setOpen(false)
                      }}
                    >
                      <Book />
                      {capitalizeFirstLetter(post.title)}
                      <span cmdk-raycast-meta="">Post</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
              <Command.Group heading={"전체 포스트"}>
                {allPosts.map(post => (
                  <Command.Item
                    key={post.id}
                    value={capitalizeFirstLetter(post.title)}
                    onSelect={() => {
                      router.push(`${getPostURL(post)}`)
                      setOpen(false)
                    }}
                  >
                    <Book />
                    {capitalizeFirstLetter(post.title)}
                    <span cmdk-raycast-meta="">Post</span>
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>

            <div cmdk-raycast-footer="">
              <div className="theme-container">
                <ThemeButtons />
              </div>

              <button cmdk-raycast-open-trigger="">
                Open
                <kbd>↵</kbd>
              </button>
            </div>
          </Command>
        </div>
      </CommandDialog>
    </>
  )
}

function ThemeButtons() {
  const [currentTheme] = useTheme()
  const setTheme = useSetTheme()
  return (
    <div className="theme-container">
      {themes.map(theme => {
        return (
          <IconButton
            key={theme}
            onClick={() => setTheme(theme)}
            className={`theme-button
            ${theme === currentTheme ? "theme-button--active" : ""}
             theme-button--${theme}`}
          >
            {theme === "dark" ? (
              <MoonIcon />
            ) : theme === "light" ? (
              <SunIcon />
            ) : (
              <ContrastIcon />
            )}
          </IconButton>
        )
      })}
    </div>
  )
}
