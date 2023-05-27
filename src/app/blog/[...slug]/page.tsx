/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdxContent } from "@/app/mdx-content"
import { BLOG_PATH } from "@/constants/path"
import { findAllPostSlugs, getPostBySlugs } from "@/helpers/slug"

export async function generateStaticParams() {
  const slugs = await findAllPostSlugs(BLOG_PATH)
  return slugs.map(slug => ({ slug }))
}

// contentlayer 로 모든 데이터 파싱
export default async function BlogDetailndex({ params }: { params: any }) {
  const { slug } = params
  const post = getPostBySlugs("/blog", slug)

  return <MdxContent post={post} />
}
