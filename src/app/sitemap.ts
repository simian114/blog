import { MetadataRoute } from "next"
import { ComponentType } from "@prisma/client"

import { getPostURL } from "@/helpers/model/post"
import prisma from "@/lib/prisma"

// NOTE: last modified 가 있어야함.
// tag 경로
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await prisma.route.findMany({
    where: { open: true, deletedAt: null },
    include: { categories: true, components: true },
  })
  const routeMap = routes.map(route => ({
    url: `/${route.url}`,
    lastModified: route.updatedAt,
  }))

  const categoryMap = routes.reduce((prev, cur) => {
    if (!cur.categories.length) {
      return prev
    }
    const routeCategoryMap = cur.categories.map(category => ({
      url: `/${cur.url}/${category.url}`,
      lastModified: category.updatedAt.toISOString(),
    }))
    return [...prev, ...routeCategoryMap]
  }, [] as Array<{ url: string; lastModified: string }>)

  const posts = await prisma.post.findMany({
    where: { deletedAt: null, published: true },
    include: { route: true, category: true, tags: { include: { tag: true } } },
  })
  const postMap = posts.map(post => ({
    url: getPostURL(post),
    lastModified: post.updatedAt.toISOString(),
  }))

  const hasTagSelectorRoutes = routes.filter(route =>
    route.components.find(
      component =>
        component.type === ComponentType.SUB_URL &&
        component.name === "TagSelector"
    )
  )

  const tagRouteMap = posts.reduce((prev, cur) => {
    console.log(hasTagSelectorRoutes)
    if (!cur.tags.length) {
      return prev
    }

    const routeTag = hasTagSelectorRoutes
      .map(route =>
        cur.tags.map(tag => ({
          url: `/${route.url}/${tag.tag.url}`,
          lastModified: tag.tag.updatedAt.toISOString(),
        }))
      )
      .flat()
    return [...prev, ...routeTag]
  }, [] as Array<{ url: string; lastModified: string }>)

  return [...routeMap, ...categoryMap, ...postMap, ...tagRouteMap].map(
    siteMapItem => ({
      url: `${process.env.URL}${siteMapItem.url}`,
      lastModified: siteMapItem.lastModified,
    })
  )
}
