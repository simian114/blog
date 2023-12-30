import { notFound } from "next/navigation"
import { COMPONENT_POSITION, ComponentType, LayoutType } from "@prisma/client"

import { fetchRouteBy } from "@/helpers/data/route"

import RouteComponentMapper from "./ComponentContainer"
import SubURLContainer from "./SubURLContainer"

interface MainListProps {
  routeURL: string
  subURL?: string
}

async function getData({ url }: { url: string }) {
  try {
    const route = await fetchRouteBy({
      where: { url },
      include: {
        components: true,
        categories: {
          include: {
            posts: {
              where: { deletedAt: null },
              include: {
                category: true,
                route: true,
                tags: { include: { tag: true } },
              },
            },
          },
        },
      },
    })
    return { route }
  } catch (error) {
    return { route: null }
  }
}
// NOTE: AllIncludeRoute 는 무조건 각 컴포넌트에 들어감
// Route Component 에는 반드시 AllIncludeRoute 가 들어가고
// Post Component 에는 반드시 AllIncludePost 가 들어간다
export default async function MainList(props: MainListProps) {
  const { route } = await getData({ url: props.routeURL })

  const category = route?.categories.find(
    category => category.url === props.subURL || ""
  )

  if (!route || (props.subURL && !category)) {
    return notFound()
  }

  const routeComponents = route.components.filter(
    component => component.position === COMPONENT_POSITION.ROUTE
  )

  return (
    <main className="index-main">
      {routeComponents.map((component, index) => {
        if (component.type === ComponentType.SUB_URL) {
          return (
            // NOTE: 언젠가 새로운 Selector 가 생길 수 있으므로, 내비둔다
            <SubURLContainer
              key={index}
              component={component}
              route={route}
              category={category}
              subURL={props.subURL}
            />
          )
        } else if (component.type === LayoutType.COMPONENT) {
          return (
            <RouteComponentMapper
              key={index}
              component={component}
              route={route}
            />
          )
        } else return <></>
      })}
    </main>
  )
}
