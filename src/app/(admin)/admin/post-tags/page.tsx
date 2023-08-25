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
  return <DataTable columns={columns} data={allTags} />
}
