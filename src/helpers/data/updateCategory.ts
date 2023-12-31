"use server"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

// NOTE: return타입을 추론하기 위해서는 fetch처럼 generic을 사용해야함

export async function updateCategory(params: Prisma.CategoryUpdateArgs) {
  const updateCategory = await prisma.category.update(params)
  revalidatePath(`/(main)/(bespoke)/[...slugs]`, "layout")
  return updateCategory
}
// NOTE: return타입을 추론하기 위해서는 fetch처럼 generic을 사용해야함

export async function createCategory(params: Prisma.CategoryCreateArgs) {
  const category = await prisma.category.create(params)
  return category
}
