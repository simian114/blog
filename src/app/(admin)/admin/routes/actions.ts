"use server"

import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate-tag"
import { Route, RouteLayoutType } from "@prisma/client"

import prisma from "@/lib/prisma"

type CreateRouteDTO = Pick<Route, "title" | "description" | "open">

interface UpdateRouteDTO {
  id: number
  data: Partial<Omit<Route, "id">>
}

export async function newRoute(data: CreateRouteDTO): Promise<Route> {
  const newRoute = await prisma.route.create({
    data: {
      ...data,
      url: data.title,
      layoutType: RouteLayoutType.CUSTOM,
    },
  })
  revalidateTag("/admin/routes")
  return newRoute
}

export async function updateRoute(data: UpdateRouteDTO): Promise<Route> {
  const updatedRoute = await prisma.route.update({
    data: data.data,
    where: {
      id: data.id,
    },
  })
  console.log("--------------")
  console.log(updatedRoute)
  console.log("--------------")
  revalidateTag("/admin/routes")
  return updatedRoute
}
