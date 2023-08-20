import prisma from "@/lib/prisma"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export const dynamic = "force-dynamic"

async function getCategoryData() {
  const categories = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      route: true,
    },
  })
  return categories
}

export default async function AdminRoutes() {
  const allCategories = await getCategoryData()
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex border-solid rounded">
      <div className="flex items-center justify-between space-y-2 border">
        <DataTable columns={columns} data={allCategories} />
      </div>
    </div>
  )
}
