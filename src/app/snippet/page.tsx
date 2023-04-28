import PostCard from "@/components/postCard/PostCard"
import { getPostBySlugs } from "@/helpers/slug"
import { allSnippetPosts } from "@/lib/server/post.server"
import { MdxContent } from "../mdx-content"

export default async function Snippet() {
  const posts = allSnippetPosts
  const post = await getPostBySlugs("/snippet")

  return (
    <main className="index-main">
      <div className="index-main__mdx-wrapper">
        {post.serialized && <MdxContent source={post.serialized} />}
      </div>

      <div className="index-main__card-list">
        <h2>최신 글</h2>
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  )
}
