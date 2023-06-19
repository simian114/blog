import { MdxContent } from "@/app/mdx-content"
import { getPostBySlugs } from "@/helpers/slug"

export default async function Resume() {
  const post = await getPostBySlugs("/resume")

  return (
    <main>
      <MdxContent post={post} />
    </main>
  )
}
