import { getPostBySlugs } from "@/helpers/slug"
import { MdxContent } from "./mdx-content"

export default async function Home() {
  const post = await getPostBySlugs("/")

  return (
    <main>{post.serialized && <MdxContent source={post.serialized} />}</main>
  )
}
