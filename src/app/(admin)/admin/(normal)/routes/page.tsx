import prisma from "@/lib/prisma"

import { RouteTableWrapper } from "./table-wrapper"

export const dynamic = "force-dynamic"

async function getRouteData() {
  const routes = await prisma.route.findMany({
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
  const allRoutes = await getRouteData()
  return <RouteTableWrapper allRoutes={allRoutes} />
}
