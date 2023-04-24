import PostCard from "@/components/postCard/PostCard"
import { getPostBySlugs } from "@/helpers/slug"
import { allDesignSystemPosts } from "@/lib/server"
import { MdxContent } from "../mdx-content"

export default async function DesignSystem() {
  const posts = allDesignSystemPosts
  const post = await getPostBySlugs("/design-system")

  return (
    <main className="design-system-main">
      {post.serialized && <MdxContent source={post.serialized} />}
      <h2 className="design-system-main__title">최신 글</h2>
      <div className="design-system-main__card-list">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  )
}
