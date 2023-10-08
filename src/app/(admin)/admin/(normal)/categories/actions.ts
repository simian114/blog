"use server"

import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate-tag"
import { Category, Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

type CreateRouteDTO = Omit<
  Prisma.CategoryCreateInput,
  "updatedAt" | "createdAt"
>

type UpdateRouteDTO = Prisma.CategoryUpdateInput & {
  id: Category["id"]
  revalidateTags?: string[]
}

export async function newCategory(data: CreateRouteDTO): Promise<Category> {
  const category = await prisma.category.create({
    data,
  })
  return category
}

export async function updateCategory(
  updateData: UpdateRouteDTO
): Promise<Category> {
  const { id, revalidateTags, ...rest } = updateData
  const category = await prisma.category.update({
    data: rest,
    where: { id },
    include: { route: true },
  })
  category?.route?.url && revalidateTag(`bespoke/route/${category.route.url}`)
  revalidateTags?.forEach(tag => revalidateTag(tag))
  return category
}
