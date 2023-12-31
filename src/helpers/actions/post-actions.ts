"use server"

import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

export async function updatePost<T extends Prisma.PostUpdateArgs>(
  params: T
): Promise<Prisma.PostGetPayload<T> | null> {
  const updatedPost = await prisma.post.update({ ...params })
  // NOTE: post 자체는 revalidate하지 않는다. revalidate 시간에 따라 일주일에 한번만 revalidate되도록한다.
  // NOTE: 만약 변경점을 바로 적용하고 싶다면 어드민 페이지에서 revalidate를 직접하도록한다.
  revalidatePath(`/(main)/(bespoke)/[...slugs]`, "layout")
  return updatedPost as any
}
// NOTE: return타입을 추론하기 위해서는 fetch처럼 generic을 사용해야함
export async function createPost(params: Prisma.PostCreateArgs) {
  const post = await prisma.post.create(params)
  revalidatePath(`/(main)/(bespoke)/[...slugs]`, "layout")
  return post
}
