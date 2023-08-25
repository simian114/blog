import { ROUTE_TYPE } from "@prisma/client"

import { getPostSlug, getPostURL } from "@/helpers/model/post"
import prisma from "@/lib/prisma"

export async function getStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { route: true, category: true, tags: { include: { tag: true } } },
  })
  // NOTE: routes
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

  const routeSlug = routes.map(route => ({
    slug: [route.url],
  }))

  const categorySlug = categories.map(category => ({
    slug: [category.route?.url, category.url],
  }))

  // NOTE: route 에 의존 tag
  const hasTagSelectorRoute = routes.find(
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

  const tagSlug = tags.map(tag => ({
    slug: [hasTagSelectorRoute?.url || "", tag.url],
  }))

  const filtered = posts.filter(post => getPostURL(post))
  return [
    ...routeSlug,
    ...categorySlug,
    ...tagSlug,
    ...filtered.map(post => ({ slug: getPostSlug(post) })),
  ]
}
