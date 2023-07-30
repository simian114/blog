"use server"

import { revalidatePath } from "next/cache"
import { Post, Prisma } from "@prisma/client"

import { getURL } from "@/helpers/model/post"
import prisma from "@/lib/prisma"

export type CreatePostDTO = Prisma.PostCreateInput

interface UpdatePostDTO {
  id: Post["id"]
  data: Omit<Post, "id">
}

// TODO: 임시저장은 나중에
export async function createPost(data: CreatePostDTO) {
  const post = await prisma.post.create({
    data,
    include: { category: true, route: true },
  })
  getURL(post) && revalidatePath(getURL(post))

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
  return post
}
