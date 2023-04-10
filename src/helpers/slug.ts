import { POST_PATH_PREFIX } from "@/constants/path"
import { allPulishedPost, readPost } from "@/lib/server"
import { glob } from "glob"
import { notFound } from "next/navigation"
import path from "path"

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

// function getPostBy(topic: string) {
//   return allPosts.filter(
//     post =>
//       post._raw.sourceFilePath.includes(topic) &&
//       !post._raw.sourceFilePath.includes("/index.mdx")
//   )
// }

export async function getPostBySlugs(prefix: string, slugs?: string[]) {
  const layerPost = allPulishedPost.find(
    post => post.slug === `${prefix}${slugs ? `/${slugs.join("/")}` : ""}`
  )
  if (!layerPost) {
    notFound()
  }
  return await readPost(`${POST_PATH_PREFIX}/${layerPost?._id}`)
}
