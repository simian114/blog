import { notFound } from "next/navigation"
import { ROUTE_TYPE } from "@prisma/client"

import prisma from "@/lib/prisma"

import MainList from "./list"

export async function generateStaticParams() {
  const routes = (
    await prisma.route.findMany({
      where: { type: { equals: ROUTE_TYPE.BESPOKE } },
      include: { components: true },
    })
  )
    .filter(route => !!route.components.length)
    .filter(route => route.url !== "")

  const routeSlug = routes.map(route => ({
    route: route.url,
  }))

  return routeSlug
}

export default async function RoutePage({
  params,
}: {
  params: { route: string }
}) {
  if (params.route) {
    return <MainList routeURL={params.route} />
  }
  return notFound()
}
