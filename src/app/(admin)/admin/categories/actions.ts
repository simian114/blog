"use server"

import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate-tag"
import { Category, Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

type CreateRouteDTO = Prisma.CategoryCreateInput

export async function newCategory(data: CreateRouteDTO): Promise<Category> {
  const category = await prisma.category.create({
    data,
  })
  revalidateTag("/admin/categories")
  return category
}
