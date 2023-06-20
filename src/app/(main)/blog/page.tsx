import { Suspense } from "react"
import { allPosts } from "contentlayer/generated"

import CategoryList from "@/components/layout/index/default/common/CategoryList"
import PostCard from "@/components/postCard/PostCard"
import { allBlogPosts, blogPostsByCategory } from "@/constants/post"
import { getPostBySlugs } from "@/helpers/slug"

import { MdxContent } from "../../mdx-content"

export default async function Blog() {
  const posts = allBlogPosts
  const post = getPostBySlugs("/blog")

  return (
    <main className="index-main">
      <section className="index-main__mdx-wrapper">
        <MdxContent post={post} />
      </section>
      {/* NOTE: Skeleton 추가할것 */}
      <Suspense fallback={<></>}>
        <CategoryList
          page="blog"
          categoryPosts={blogPostsByCategory}
          allPosts={allPosts}
          className="index-main__category-list"
        />
      </Suspense>
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
