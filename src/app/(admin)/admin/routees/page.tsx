import prisma from "@/lib/prisma"

import { RouteTableWrapper } from "./table-wrapper"

async function getRouteData() {
  const routes = await prisma.routee.findMany({
    orderBy: {
      id: "desc",
    },
  })
  return routes
}

async function getCategoryData() {
  const categories = await prisma.categoryZ.findMany({})
  return categories
}

export default async function AdminRoutes() {
  const allRoutes = await getRouteData()
  const allCategories = await getCategoryData()
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex border-solid rounded">
      <div className="flex items-center justify-between space-y-2 border">
        <RouteTableWrapper
          allCategories={allCategories}
          allRoutes={allRoutes}
        />
      </div>
    </div>
  )
}