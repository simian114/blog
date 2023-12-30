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
    return route as any
  } catch (error) {
    // TODO: logging 시스템 구축
    return null
  }
}
