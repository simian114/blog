"use server"

import { Post } from "@prisma/client"
import readingTime from "reading-time"

import prisma from "@/lib/prisma"

export type CreatePostDTO = Omit<Post, "id"> & { info?: { url?: string } }

interface UpdatePostDTO {
  id: Post["id"]
  data: Omit<Post, "id">
}

export async function createPost(data: CreatePostDTO) {
  if (!data.categoryId) {
    const post = await prisma.post.create({
      data: {
        ...data,
        info: {
          create: {
            readingTime: 0,
            url: `/${data.title}`,
          },
        },
      },
    })
    return post
  }
  const category = await prisma.category.findUnique({
    where: { id: data?.categoryId },
    include: { route: true },
  })
  //
  const post = await prisma.post.create({
    data: {
      ...data,
      info: {
        create: {
          readingTime: readingTime(data.content || "").minutes,
          url: `/${category?.route?.title}/${
            category?.title
          }/${data.title.replaceAll(" ", "_")}`,
          slug: [
            category?.route?.title || "",
            category?.title || "",
            data.title.replaceAll(" ", "_"),
          ],
        },
      },
    },
  })
  return post
}

export async function updatePost(dto: UpdatePostDTO) {
  const post = await prisma.post.update({
    data: dto.data,
    where: {
      id: dto.id,
    },
  })
  return post
}
