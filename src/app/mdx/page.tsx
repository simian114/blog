import { getPostBySlugs } from "@/helpers/slug"
import { MdxContent } from "../mdx-content"

export default async function MdxStyle() {
  const post = await getPostBySlugs("/mdx")

  return (
    <main>
      <MdxContent post={post} />
    </main>
  )
}
