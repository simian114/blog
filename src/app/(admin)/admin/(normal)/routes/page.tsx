import { fetchRouteList } from "@/helpers/data/route"

import { RouteTableWrapper } from "./table-wrapper"

export const dynamic = "force-dynamic"

async function getRouteData() {
  const routes = fetchRouteList({
    orderBy: {
      id: "asc",
    },
    include: {
      categories: true,
      components: true,
    },
  })
  return routes
}

export default async function AdminRoutes() {
  const routes = await getRouteData()
  return <RouteTableWrapper allRoutes={routes} />
}
