import { Route } from "@prisma/client"

import Typography from "@/components/typography/Typography"
import { capitalizeFirstLetter } from "@/lib/utils"

interface RouteDescriptorProps {
  routeURL?: string
}

async function getData({ url }: { url?: string }): Promise<{
  route: Route | null
}> {
  if (!url) {
    return { route: null }
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/layout/components/category-selector/${url}`,
      { next: { tags: [`route-descriptor/${url}`] } }
    )
    const route = await res.json()
    return { route }
  } catch (error) {
    return { route: null }
  }
}

/**
 *
 * @param {string} routeURL this is route url
 * @description this is description tag
 *
 */
export default async function RouteDescriptor(props: RouteDescriptorProps) {
  const { route } = await getData({ url: props.routeURL })

  if (!route) {
    return null
  }

  return (
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
  )
}
