import prisma from "@/lib/prisma"

import { columns } from "./columns"
import { DataTable } from "./data-table"

async function getAllPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      tags: true,
      category: true,
      route: true,
    },
  })
  return posts
}

export default async function AdminPosts() {
  const posts = await getAllPosts()
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex border-solid rounded">
      <div className="flex items-center justify-between space-y-2 border">
        <DataTable columns={columns} data={posts} />
      </div>
    </div>
  )
}
