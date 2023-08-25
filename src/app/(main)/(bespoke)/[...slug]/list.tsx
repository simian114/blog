import { notFound } from "next/navigation"
import { LayoutType, Prisma, SubUrlPost } from "@prisma/client"

import CategorySubURLSelector from "@/components/layout/index/default/common/CategorySubURLSelector"
import TagSubURLSelector from "@/components/layout/index/default/common/TagSubUrlSelector"
import Typography from "@/components/typography/Typography"
import prisma from "@/lib/prisma"
import { capitalizeFirstLetter } from "@/lib/utils"

import ComponentMapper from "./ComponentMapper"

interface MainListProps {
  routeURL: string
  subURL?: string
}

async function getData() {
  const routes = await prisma.route.findMany({
    where: { open: true },
    include: {
      components: true,
      categories: {
        include: {
          route: true,
        },
      },
    },
  })

  return { routes }
}

export default async function MainList(props: MainListProps) {
  const { routes } = await getData()
  const route = routes.find(route => route.url === props.routeURL)
  const category = route?.categories.find(
    category => category.url === props.subURL || ""
  )
  if (!route) {
    return notFound()
  }
  return (
    <main className="index-main">
      <div>
        <Typography variants="h1" colorLevel={12}>
          {capitalizeFirstLetter(route.title)}
        </Typography>
        <p>
          <Typography variants="subtitle1" colorLevel={11}>
            {route.description}
          </Typography>
        </p>
      </div>
      {route.components.map((component, index) => {
        const componentName = component.name
        const componentProps = component.props as Prisma.JsonObject
        if (component.type === LayoutType.SUB_URL) {
          const postType = (componentProps.post || SubUrlPost.CARD) as string

          if (componentName === "CategorySelector") {
            return (
              <CategorySubURLSelector
                key={index}
                className="index-main__category-list"
                type={postType}
                currentRoute={route}
                currentCategory={category}
              />
            )
          } else if (componentName === "TagSelector") {
            return (
              <TagSubURLSelector
                key={index}
                currentRoute={route}
                subURL={props.subURL || ""}
              />
            )
          }
        } else if (component.type === LayoutType.COMPONENT) {
          const Component = ComponentMapper[componentName]
          if (!Component) {
            return <></>
          }
          return <Component key={index} />
        }
        return <></>
      })}
    </main>
  )
}
