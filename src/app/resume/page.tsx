import { getPostBySlugs } from "@/helpers/slug"
import { MdxContent } from "../mdx-content"

export default async function Resume() {
  const post = await getPostBySlugs("/resume")

  return (
    <main>
      <MdxContent post={post} />
    </main>
  )
}
