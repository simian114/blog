import prisma from "@/lib/prisma"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export const dynamic = "force-dynamic"

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
  return <DataTable columns={columns} data={posts} />
}
