import prisma from "@/lib/prisma"

import { columns } from "./columns"
import { DataTable } from "./data-table"

async function getCategoryData() {
  const tags = await prisma.tag.findMany({
    orderBy: { id: "asc" },
    include: { posts: true },
  })
  return tags
}

export default async function AdminRoutes() {
  const allTags = await getCategoryData()
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex border-solid rounded">
      <div className="flex items-center justify-between space-y-2 border">
        <DataTable columns={columns} data={allTags} />
      </div>
    </div>
  )
}
