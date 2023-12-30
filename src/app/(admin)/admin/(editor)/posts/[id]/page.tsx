import { Prisma } from "@prisma/client"

import { fetchPostBy } from "@/helpers/data/post"

import EditMDXEditor from "./EditMdxEditor"

export type AllIncludedPost = Prisma.PostGetPayload<{
  include: {
    category: true
    route: true
    tags: {
      include: {
        tag: true
      }
    }
  }
}>

async function getData(id: number) {
  const post = await fetchPostBy({
    where: { id },
    include: {
      category: true,
      route: true,
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
  return <EditMDXEditor post={post} />
}
