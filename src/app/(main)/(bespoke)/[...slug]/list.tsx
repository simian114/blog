import { notFound } from "next/navigation"
import { ComponentType, LayoutType } from "@prisma/client"

import Typography from "@/components/typography/Typography"
import prisma from "@/lib/prisma"
import { capitalizeFirstLetter } from "@/lib/utils"

import ComponentContainer from "./ComponentContainer"
import SubURLContainer from "./SubURLContainer"

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
        if (component.type === ComponentType.SUB_URL) {
          return (
            <SubURLContainer
              key={index}
              component={component}
              route={route}
              category={category}
              subURL={props.subURL}
            />
          )
        } else if (component.type === LayoutType.COMPONENT) {
          return <ComponentContainer key={index} component={component} />
        } else return <></>
      })}
    </main>
  )
}