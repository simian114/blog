import { getPostBySlugs } from "@/helpers/slug"
import { MdxContent } from "./mdx-content"

export default async function Home() {
  const post = await getPostBySlugs("/")

  return (
    <main>
      <div className="inner">
        {post.serialized && <MdxContent source={post.serialized} />}
      </div>
    </main>
  )
}
