"use server"

import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate-tag"
import { Prisma, Tag } from "@prisma/client"

import prisma from "@/lib/prisma"

type CreateTagDTO = Omit<Prisma.TagCreateInput, "updatedAt" | "createdAt">

export async function newTag(data: CreateTagDTO): Promise<Tag> {
  const tag = await prisma.tag.create({
    data,
  })
  revalidateTag("/admin/post-tags")
  return tag
}

type UpdateTagDTO = Prisma.TagUpdateInput & {
  id: Tag["id"]
}

export async function updatetag(data: UpdateTagDTO): Promise<Tag> {
  const { id, ...rest } = data
  const tag = await prisma.tag.update({
    data: rest,
    where: {
      id,
    },
  })
  revalidateTag("/admin/post-tags")
  return tag
}
