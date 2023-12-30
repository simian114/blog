import { fetchTagList } from "@/helpers/data/tag"

import { columns } from "./columns"
import { DataTable } from "./data-table"

async function getData() {
  const tags = await fetchTagList({
    orderBy: { id: "asc" },
    include: { posts: true },
  })
  return tags
}

export default async function AdminRoutes() {
  const allTags = await getData()
  return <DataTable columns={columns} data={allTags} />
}
