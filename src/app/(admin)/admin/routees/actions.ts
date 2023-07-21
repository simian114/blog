"use server"

import { revalidateTag } from "next/dist/server/web/spec-extension/revalidate-tag"
import { Routee } from "@prisma/client"

import prisma from "@/lib/prisma"

type CreateRouteDTO = Pick<Routee, "title" | "description" | "open">
interface UpdateRouteDTO {
  id: number
  data: Partial<Omit<Routee, "id">>
}

export async function newRoute(data: CreateRouteDTO): Promise<Routee> {
  const newRoute = await prisma.routee.create({
    data,
  })
  revalidateTag("/admin/routees")
  return newRoute
}

export async function updateRoute(data: UpdateRouteDTO): Promise<Routee> {
  const updatedRoute = await prisma.routee.update({
    data: data.data,
    where: {
      id: data.id,
    },
  })
  console.log("--------------")
  console.log(updatedRoute)
  console.log("--------------")
  revalidateTag("/admin/routees")
  return updatedRoute
}
