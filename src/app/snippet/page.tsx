import PostCard from "@/components/postCard/PostCard"
import { allSnippetPosts, getPostBySlugs } from "@/helpers/slug"
import { MdxContent } from "../mdx-content"

export default async function Snippet() {
  const post = await getPostBySlugs("/snippet")
  const posts = allSnippetPosts

  return (
    <main>
      {post.serialized && <MdxContent source={post.serialized} />}
      <div className="snippet-main__card-list">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  )
}
