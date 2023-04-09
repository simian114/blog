import PostCard from "@/components/postCard/PostCard"
import { allSnippetPosts, getPostBySlugs } from "@/helpers/slug"
import { MdxContent } from "../mdx-content"

export default async function Snippet() {
  const posts = allSnippetPosts
  const post = await getPostBySlugs("/snippet")

  return (
    <main className="snippet-main">
      <div className="snippet-main__mdx-wrapper">
        {post.serialized && <MdxContent source={post.serialized} />}
      </div>

      <div className="snippet-main__card-list">
        <h2>최신 글</h2>
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  )
}
