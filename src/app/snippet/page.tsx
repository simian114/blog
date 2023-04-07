import { getPostBySlugs } from "@/helpers/slug"
import { MdxContent } from "../mdx-content"

export default async function Snippet() {
  const post = await getPostBySlugs("/snippet")

  return (
    <main>{post.serialized && <MdxContent source={post.serialized} />}</main>
  )
}
