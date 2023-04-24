/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdxContent } from "@/app/mdx-content"
import { DESIGN_SYSTEM_PATH } from "@/constants/path"
import { findAllPostSlugs, getPostBySlugs } from "@/helpers/slug"

export async function generateStaticParams() {
  const slugs = await findAllPostSlugs(DESIGN_SYSTEM_PATH)
  return slugs.map(slug => ({ slug }))
}

// contentlayer 로 모든 데이터 파싱
export default async function DesignSystemDetailndex({
  params,
}: {
  params: any
}) {
  const { slug } = params
  const post = await getPostBySlugs("/design-system", slug)

  return <>{post?.serialized && <MdxContent source={post?.serialized} />}</>
}
