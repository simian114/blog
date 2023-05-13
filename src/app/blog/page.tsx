import CategoryList from "@/components/layout/index/default/common/CategoryList"
import PostCard from "@/components/postCard/PostCard"
import { getPostBySlugs } from "@/helpers/slug"
import { allBlogPosts, blogPostsByCategory } from "@/lib/server/post.server"
import { MdxContent } from "../mdx-content"
import { allPosts } from "contentlayer/generated"

export default async function Blog() {
  const posts = allBlogPosts
  const post = await getPostBySlugs("/blog")

  return (
    <main className="index-main">
      <section className="index-main__mdx-wrapper">
        <MdxContent post={post} />
      </section>
      <CategoryList
        page="blog"
        categoryPosts={blogPostsByCategory}
        allPosts={allPosts}
        className="index-main__category-list"
      />
      <section className="index-main__card-list">
        <h2>전체</h2>
        <div className="post-container">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </main>
  )
}
