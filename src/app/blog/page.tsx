import PostCard from "@/components/postCard/PostCard"
import { getPostBySlugs } from "@/helpers/slug"
import { allBlogPosts } from "@/lib/server/post.server"
import { MdxContent } from "../mdx-content"

export default async function Blog() {
  const posts = allBlogPosts
  const post = await getPostBySlugs("/blog")

  return (
    <main className="blog-main">
      <div className="blog-main__mdx-wrapper">
        {post.serialized && <MdxContent source={post.serialized} />}
      </div>

      <div className="blog-main__card-list">
        <h2>최신 글</h2>
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  )
}
