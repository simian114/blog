import { notFound } from "next/navigation"
import { Post } from "contentlayer/generated"
import { glob } from "glob"
import path from "path"

import { allPublishedPost } from "@/constants/post"

export function getSlug(slugPath: string, root: string) {
  const replacedPath = slugPath.replace(`${root}/`, "")
  const [slug] = /.+(?=.mdx)/i.exec(replacedPath) as string[]
  return slug.split("/")
}

// NOTE: allPosts 로 변경하기
export function findAllPostSlugs(loc: string) {
  return glob(path.join(loc, "**/*.mdx")).then(paths => {
    return paths.map(p => getSlug(p, loc))
  })
}

export function getPostBySlugs(prefix: string, slugs?: string[]): Post {
  const layerPost = allPublishedPost.find(
    post => post.slug === `${prefix}${slugs ? `/${slugs.join("/")}` : ""}`
  )
  if (!layerPost) {
    notFound()
  }
  return layerPost
}
