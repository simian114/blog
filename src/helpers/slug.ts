import { POST_PATH_PREFIX } from "@/constants/path"
import { readPost } from "@/lib/server"
import { allPosts } from "contentlayer/generated"
import { glob } from "glob"
import { notFound } from "next/navigation"
import path from "path"

export function getSlug(slugPath: string, root: string) {
  const replacedPath = slugPath.replace(`${root}/`, "")
  const [slug] = /.+(?=.mdx)/i.exec(replacedPath) as string[]
  return slug.split("/")
}

export function findAllPostSlugs(loc: string) {
  return glob(path.join(loc, "**/*.mdx")).then(paths => {
    return paths.map(p => getSlug(p, loc))
  })
}

export async function getPostBySlugs(prefix: string, slugs?: string[]) {
  const layerPost = allPosts.find(
    post => post.slug === `${prefix}${slugs ? `/${slugs.join("/")}` : ""}`
  )
  if (!layerPost) {
    notFound()
  }
  return await readPost(`${POST_PATH_PREFIX}/${layerPost?._id}`)
}
