"use server"

import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"

export async function fetchRouteList<T extends Prisma.RouteFindManyArgs>(
  params?: T
): Promise<Array<Prisma.RouteGetPayload<T>>> {
  try {
    const routes = await prisma.route.findMany(params)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return routes as any
  } catch (error) {
    // TODO: logging 시스템 구축
    return []
  }
}

export async function fetchRouteBy<T extends Prisma.RouteFindFirstOrThrowArgs>(
  params: T
): Promise<Prisma.RouteGetPayload<T> | null> {
  try {
    const route = await prisma.route.findFirstOrThrow(params)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return route as any
  } catch (error) {
    // TODO: logging 시스템 구축
    return null
  }
}

// NOTE: return타입을 추론하기 위해서는 fetch처럼 generic을 사용해야함
export async function updateRoute(params: Prisma.RouteUpdateArgs) {
  const updateRoute = await prisma.route.update(params)
  revalidatePath(`/(main)/(bespoke)/[...slugs]`, "layout")
  return updateRoute
}

// NOTE: return타입을 추론하기 위해서는 fetch처럼 generic을 사용해야함
export async function createRoute(params: Prisma.RouteCreateArgs) {
  const route = await prisma.route.create(params)
  return route
}
