import { fetchCategoryList } from "@/helpers/data/category"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export const dynamic = "force-dynamic"

async function getCategoryData() {
  const categories = await fetchCategoryList({
    orderBy: { id: "asc" },
    include: { route: true, posts: true },
  })
  return categories
}

export default async function AdminRoutes() {
  const allCategories = await getCategoryData()
  return <DataTable columns={columns} data={allCategories} />
}
