import { notFound } from "next/navigation"
import { ROUTE_TYPE } from "@prisma/client"

import prisma from "@/lib/prisma"

import MainList from "../list"

export const revalidate = 60 // revalidate this page every 60 seconds

// NOTE: category only
export async function generateStaticParams() {
  const routes = (
    await prisma.route.findMany({
      where: { type: { equals: ROUTE_TYPE.BESPOKE } },
      include: { components: true },
    })
  )
    .filter(route => !!route.components.length)
    .filter(route => route.url !== "")

  const categories = await prisma.category.findMany({
    where: { route: { type: { equals: ROUTE_TYPE.BESPOKE } } },
    include: { route: true },
  })

  const categorySlug = categories.map(category => ({
    route: category.route?.url,
    subURL: category.url,
  }))

  // NOTE: route 에 의존 tag
  const hasTagSelectorRoutes = routes.filter(
    route =>
      !!route.components.find(
        component =>
          component.type === "SUB_URL" && component.name === "TagSelector"
      )
  )

  const tags = (
    await prisma.tag.findMany({
      include: {
        posts: true,
      },
    })
  ).filter(tag => !!tag.posts.length)

  const tagSlug = hasTagSelectorRoutes
    .map(hasTagSelectorRoute =>
      tags.map(tag => ({
        route: hasTagSelectorRoute?.url,
        subURL: tag.url,
      }))
    )
    .flat()
  return [...categorySlug, ...tagSlug]
}

export default async function SubURLPage({
  params,
}: {
  params: { route: string; subURL: string }
}) {
  if (params.route || params.subURL) {
    return <MainList routeURL={params.route} subURL={params.subURL} />
  }
  return notFound()
}
