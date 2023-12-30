"use server"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

export async function fetchTagList<T extends Prisma.TagFindManyArgs>(
  params?: T
): Promise<Array<Prisma.TagGetPayload<T>>> {
  try {
    const tags = await prisma.tag.findMany(params)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return tags as any
  } catch (error) {
    // TODO: logging 시스템 구축
    return []
  }
}

// NOTE: return타입을 추론하기 위해서는 fetch처럼 generic을 사용해야함
export async function updateTag(params: Prisma.TagUpdateArgs) {
  const updatedTag = await prisma.tag.update(params)
  revalidatePath(`/(main)/(bespoke)/[...slugs]`, "layout")
  return updatedTag
}

// NOTE: return타입을 추론하기 위해서는 fetch처럼 generic을 사용해야함
export async function createTag(params: Prisma.TagCreateArgs) {
  const tag = await prisma.tag.create(params)
  // NOTE: create인 경우에는 굳이 revalidate할 필요 없음
  return tag
}
