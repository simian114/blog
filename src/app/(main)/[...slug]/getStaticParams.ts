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
      where: { open: true },
      include: { layouts: true },
    })
  )
    .filter(route => !!route.layouts.length)
    .filter(route => route.url !== "")

  const categories = await prisma.category.findMany({
    where: { route: { open: true } },
    include: { route: true },
  })

  const routeSlug = routes.map(route => ({
    slug: [route.url],
  }))
  const categorySlug = categories.map(category => ({
    slug: [category.route?.url, category.url],
  }))

  const filtered = posts.filter(post => getPostURL(post))
  return [
    ...routeSlug,
    ...categorySlug,
    ...filtered.map(post => ({ slug: getPostSlug(post) })),
  ]
}
