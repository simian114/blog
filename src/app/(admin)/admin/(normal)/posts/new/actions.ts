"use server"

import { revalidateTag } from "next/cache"
import { Post, Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

export type CreatePostDTO = Prisma.PostCreateInput

interface UpdatePostDTO {
  id: Post["id"]
  data: Prisma.PostUpdateInput
}

// TODO: 임시저장은 나중에
export async function createPost(data: CreatePostDTO) {
  const post = await prisma.post.create({
    data,
    include: { category: true, route: true, tags: true },
  })
  revalidateTag(`category-selector/${post.route?.url}`)
  return post
}

export async function updatePost(dto: UpdatePostDTO) {
  const post = await prisma.post.update({
    data: dto.data,
    where: {
      id: dto.id,
    },
    include: { category: true, route: true },
  })

  const routeId = post.routeId
  const categoryId = post.categoryId
  const params = new URLSearchParams()

  if (typeof routeId === "number") {
    params.append("routeId", routeId.toString())
    revalidateTag(`/api/post?${params.toString()}`)
  }
  if (typeof categoryId === "number") {
    params.append("categoryId", categoryId.toString())
    revalidateTag(`/api/post?${params.toString()}`)
  }
  revalidateTag("/api/post")
  return post
}
