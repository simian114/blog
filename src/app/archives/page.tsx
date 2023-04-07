import { getPostBySlugs } from "@/helpers/slug"
import { MdxContent } from "../mdx-content"

export default async function archives() {
  const post = await getPostBySlugs("/archives")

  return (
    <main>{post.serialized && <MdxContent source={post.serialized} />}</main>
  )
}
