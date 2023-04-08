import { getPostBySlugs } from "@/helpers/slug"
import { MdxContent } from "../mdx-content"

export default async function Resume() {
  const post = await getPostBySlugs("/resume")

  return (
    <main>{post.serialized && <MdxContent source={post.serialized} />}</main>
  )
}
