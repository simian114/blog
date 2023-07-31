import { Prisma } from "@prisma/client"

type PostWithCategoryAndRoute = Prisma.PostGetPayload<{
  include: { category: true; route: true }
}>

// NOTE: category 가 있는 것만 처리하면됨
/**
 *
 * case
 *  1. route 만 있는 경우 -> routeRepresentPost
 *  2. route & category 가 있는 경우 -> normal
 *  3. 둘 다 없는 경우 -> None
 * (category 만 있는 경우는 없다.)
 */
export function getPostURL(post: PostWithCategoryAndRoute) {
  // NOTE: Route만 있는 경우
  if (!post.category || !post.route) {
    return ""
  }
  // NOTE: category & route 있는 경우
  return `${post.route.url}/${post.category.url}/${post.url}`
}

export function getPostSlug(post: PostWithCategoryAndRoute) {
  return getPostURL(post)?.split("/") || []
}
