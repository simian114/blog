"use server"

import { revalidatePath } from "next/cache"
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
  if (post?.route?.url) {
    revalidatePath(`/(main)/(bespoke)/[...slugs]`, "layout")
  }
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

  if (post?.route?.url) {
    revalidatePath(`/(main)/(bespoke)/[...slugs]`, "layout")
    // revalidateTag(`bespoke/route/${post.route.url}`)
    // revalidateTag("/api/post")
    // revalidateTag(`/api/post/${post.url}`)
  }
  return post
}
