import { ROUTE_TYPE } from "@prisma/client"

import prisma from "@/lib/prisma"

import MainList from "./list"

export const dynamicParams = true

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    where: { route: { type: { equals: ROUTE_TYPE.BESPOKE } } },
    include: { route: true },
  })

  const categorySlug = categories.map(category => [
    category.route?.url,
    category.url,
  ])
  return categorySlug
}

export default async function RoutePage({
  params,
}: {
  params: { slugs: string[] }
}) {
  return <MainList routeURL={params.slugs[0]} subURL={params.slugs?.[1]} />
}
