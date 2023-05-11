import CategoryList from "@/components/layout/index/default/common/CategoryList"
import PostCard from "@/components/postCard/PostCard"
import { getPostBySlugs } from "@/helpers/slug"
import {
  allSnippetPosts,
  snippetPostsByCategory,
} from "@/lib/server/post.server"
import { allPosts } from "contentlayer/generated"
import { MdxContent } from "../mdx-content"

export default async function Snippet() {
  const posts = allSnippetPosts
  const post = await getPostBySlugs("/snippet")

  return (
    <main className="index-main">
      <section className="index-main__mdx-wrapper">
        {post.serialized && <MdxContent source={post.serialized} />}
      </section>
      <CategoryList
        page="snippet"
        categoryPosts={snippetPostsByCategory}
        className="index-main__category-list"
        allPosts={allPosts}
      />
      <section className="index-main__card-list">
        <h2>최신 글</h2>
        <div className="post-container">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </main>
  )
}
