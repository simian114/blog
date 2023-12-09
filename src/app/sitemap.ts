import { MetadataRoute } from "next"

import { getPostURL } from "@/helpers/model/post"
import prisma from "@/lib/prisma"

export const revalidate = 60 * 60 * 24
export const dynamic = "force-dynamic"
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

  return [...routeMap, ...categoryMap, ...postMap].map(siteMapItem => ({
    url: `${process.env.URL}${siteMapItem.url}`,
    lastModified: siteMapItem.lastModified,
  }))
}
