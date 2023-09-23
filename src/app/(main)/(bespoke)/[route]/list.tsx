import { notFound } from "next/navigation"
import { COMPONENT_POSITION, ComponentType, LayoutType } from "@prisma/client"

import Typography from "@/components/typography/Typography"
import { capitalizeFirstLetter } from "@/lib/utils"
import { AllIncludeRoute } from "@/types/bespoke-components"

import RouteComponentMapper from "./ComponentContainer"
import SubURLContainer from "./SubURLContainer"

interface MainListProps {
  routeURL: string
  subURL?: string
}

// NOTE: route 정보는 들어가야함
async function getData({ url }: { url: string }): Promise<{
  route: AllIncludeRoute | null
}> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/layout/components/category-selector/${url}`,
      { next: { tags: [`category-selector/${url}`] } }
    )
    const route = await res.json()
    return { route }
  } catch (error) {
    return { route: null }
  }
}

export default async function MainList(props: MainListProps) {
  const { route } = await getData({ url: props.routeURL })

  const category = route?.categories.find(
    category => category.url === props.subURL || ""
  )

  if (!route) {
    return notFound()
  }

  const routeComponents = route.components.filter(
    component => component.position === COMPONENT_POSITION.ROUTE
  )

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

      {routeComponents.map((component, index) => {
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
          return <RouteComponentMapper key={index} component={component} />
        } else return <></>
      })}
    </main>
  )
}
