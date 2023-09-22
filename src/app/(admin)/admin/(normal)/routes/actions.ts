"use server"

import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate-tag"
import { Prisma, Route } from "@prisma/client"

import prisma from "@/lib/prisma"

type CreateRouteDTO = Prisma.RouteCreateInput

interface UpdateRouteDTO {
  id: number
  data: Prisma.RouteUpdateInput
  revalidateTags?: string[]
}

export async function newRoute(data: CreateRouteDTO): Promise<Route> {
  const newRoute = await prisma.route.create({
    data,
  })
  revalidateTag("/api/layout/header")
  return newRoute
}

export async function updateRoute(data: UpdateRouteDTO): Promise<Route> {
  const updatedRoute = await prisma.route.update({
    data: data.data,
    where: { id: data.id },
    include: { categories: true },
  })
  data.revalidateTags?.forEach(tag => revalidateTag(tag))
  revalidateTag("/api/layout/header")
  revalidateTag(`/api/route/${updatedRoute.id}`)
  revalidateTag("/api/post")
  const params = new URLSearchParams()
  params.append("routeId", updatedRoute.id.toString())
  revalidateTag(`/api/post?${params.toString()}`)
  updatedRoute.categories.forEach(category => {
    params.set("categoryId", category.id.toString())
    revalidateTag(`/api/post?${params.toString()}`)
  })
  return updatedRoute
}
