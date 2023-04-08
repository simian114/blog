import PostCard from "@/components/postCard/PostCard"
import { allBlogPosts, getPostBySlugs } from "@/helpers/slug"
import { MdxContent } from "../mdx-content"

export default async function Blog() {
  const posts = allBlogPosts
  const post = await getPostBySlugs("/blog")

  return (
    <main className="blog-main">
      {post.serialized && <MdxContent source={post.serialized} />}
      <div className="blog-main__card-list">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  )
}
