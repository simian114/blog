"use server"

import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate-tag"
import { CategoryZ } from "@prisma/client"

import prisma from "@/lib/prisma"

type CreateRouteDTO = Pick<CategoryZ, "title" | "description" | "open">

export async function newCategory(data: CreateRouteDTO): Promise<CategoryZ> {
  const category = await prisma.categoryZ.create({
    data,
  })
  revalidateTag("/admin/categories")
  return category
}
