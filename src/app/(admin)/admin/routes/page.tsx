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
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex border-solid rounded">
      <div className="flex items-center justify-between space-y-2 border">
        <RouteTableWrapper allRoutes={allRoutes} />
      </div>
    </div>
  )
}
