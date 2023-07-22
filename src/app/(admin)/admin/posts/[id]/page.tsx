import { Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

import EditMDXEditor from "./EditMdxEditor"

export type AllIncludedPost = Prisma.PostGetPayload<{
  include: {
    info: true
    category: true
    route: true
    tags: {
      include: {
        tag: true
      }
    }
  }
}>

async function getData(id: number): Promise<{ post: AllIncludedPost | null }> {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      category: true,
      route: true,
      info: true,
      tags: { include: { tag: true } },
    },
  })
  return { post }
}

export default async function EditPostPage({
  params,
}: {
  params: { id: string }
}) {
  const { post } = await getData(Number(params.id))
  if (!post) {
    return <div>not found</div>
  }
  return (
    <div>
      <EditMDXEditor post={post} />
    </div>
  )
}
