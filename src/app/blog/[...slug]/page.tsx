/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdxContent } from "@/app/mdx-content"
import { getPostBySlugs } from "@/helpers/slug"
import { allBlogPosts } from "@/lib/server"

export const dynamicParams = false

export async function generateStaticParams() {
  const blogPosts = allBlogPosts
  return blogPosts.map(post => ({
    slug: post.slug.replace("/blog", "").slice(1).split("/"),
  }))
}

// contentlayer 로 모든 데이터 파싱
export default async function BlogDetailndex({ params }: { params: any }) {
  const { slug } = params
  const post = getPostBySlugs("/blog", slug)

  return <MdxContent post={post} />
}
