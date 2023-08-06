import { notFound } from "next/navigation"
import { LayoutType, Prisma, SubUrlPost, SubUrlSelector } from "@prisma/client"

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
      layouts: true,
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
      {route.layouts.map((layout, index) => {
        if (layout.type === LayoutType.SUB_URL) {
          const extendedData = layout?.extendedData as Prisma.JsonObject
          const selector = extendedData.selector
          if (selector === SubUrlSelector.CATEGORY) {
            const postType = extendedData.post as SubUrlPost
            return (
              <CategorySubURLSelector
                key={index}
                className="index-main__category-list"
                type={postType}
                currentRoute={route}
                currentCategory={category}
              />
            )
          } else if (selector === SubUrlSelector.TAG) {
            return (
              <TagSubURLSelector
                key={index}
                currentRoute={route}
                subURL={props.subURL || ""}
              />
            )
          }
        } else if (layout.type === LayoutType.COMPONENT) {
          const componentName = (layout.extendedData as Prisma.JsonObject)
            .name as string
          const Component = ComponentMapper[componentName]
          if (!Component) {
            return <></>
          }
          // NOTE: mapper 만들기
          return <Component key={index} />
        }
        return <></>
      })}
    </main>
  )
}
