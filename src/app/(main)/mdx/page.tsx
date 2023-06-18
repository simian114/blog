import { MdxContent } from "@/app/mdx-content"
import { getPostBySlugs } from "@/helpers/slug"

export default async function MdxStyle() {
  const post = await getPostBySlugs("/mdx")

  return (
    <main>
      <MdxContent post={post} />
    </main>
  )
}
