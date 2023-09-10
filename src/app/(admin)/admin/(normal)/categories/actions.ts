"use server"

import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate-tag"
import { Category, Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

type CreateRouteDTO = Omit<
  Prisma.CategoryCreateInput,
  "updatedAt" | "createdAt"
>

type UpdateRouteDTO = Prisma.CategoryUpdateInput & { id: Category["id"] }

export async function newCategory(data: CreateRouteDTO): Promise<Category> {
  const category = await prisma.category.create({
    data,
  })
  revalidateTag("/admin/categories")
  return category
}

export async function updateCategory(
  updateData: UpdateRouteDTO
): Promise<Category> {
  const { id, ...rest } = updateData
  const category = await prisma.category.update({ data: rest, where: { id } })
  revalidateTag("/admin/categories")
  return category
}
