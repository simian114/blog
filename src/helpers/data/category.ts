"use server"

import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

export async function fetchCategoryList<T extends Prisma.CategoryFindManyArgs>(
  params?: T
): Promise<Array<Prisma.CategoryGetPayload<T>>> {
  try {
    const categories = await prisma.category.findMany(params)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return categories as any
  } catch (error) {
    // TODO: logging 시스템 구축
    return []
  }
}

export async function fetchCategoryBy<
  T extends Prisma.CategoryFindFirstOrThrowArgs
>(params: T): Promise<Prisma.RouteGetPayload<T> | null> {
  try {
    const category = await prisma.category.findFirstOrThrow(params)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return category as any
  } catch (error) {
    // TODO: logging 시스템 구축
    return null
  }
}

// NOTE: return타입을 추론하기 위해서는 fetch처럼 generic을 사용해야함
export async function updateCategory(params: Prisma.CategoryUpdateArgs) {
  const updateCategory = await prisma.category.update(params)
  revalidatePath(`/(main)/(bespoke)/[...slugs]`, "layout")
  revalidatePath("/(main)/(bespoke-detail)/[route]/[subURL]/[post]", "layout")
  return updateCategory
}

// NOTE: return타입을 추론하기 위해서는 fetch처럼 generic을 사용해야함
export async function createCategory(params: Prisma.CategoryCreateArgs) {
  const category = await prisma.category.create(params)
  return category
}
