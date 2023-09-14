"use server"

import { revalidatePath } from "next/cache"
import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate-tag"
import { Prisma, Route } from "@prisma/client"

import prisma from "@/lib/prisma"

type CreateRouteDTO = Prisma.RouteCreateInput

interface UpdateRouteDTO {
  id: number
  data: Prisma.RouteUpdateInput
}

export async function newRoute(data: CreateRouteDTO): Promise<Route> {
  const newRoute = await prisma.route.create({
    data,
  })
  revalidateTag("/admin/routes")
  revalidatePath("/", "layout")
  return newRoute
}

export async function updateRoute(data: UpdateRouteDTO): Promise<Route> {
  const updatedRoute = await prisma.route.update({
    data: data.data,
    where: { id: data.id },
  })
  revalidateTag("/admin/routes")
  revalidatePath("/", "layout")
  return updatedRoute
}
