import { Metadata } from "next"

import DetailDefaultLayout from "@/components/layout/detail/default/DetailDefaultLayout"
import { defaultMeta } from "@/constants/metadata"
import { fetchPostBy, fetchPostList } from "@/helpers/data/post"

export const dynamicParams = true
export const revalidate = 604800 // NOTE: 일주일

export async function generateStaticParams() {
  const posts = await fetchPostList({
    where: { published: true },
    include: { route: true, category: true, tags: { include: { tag: true } } },
  })
  return posts
    .filter(post => post.route?.url && post.category?.url && post.url)
    .map(post => ({
      route: post.route?.url || "",
      subURL: post.category?.url || "",
      post: post.url,
    }))
}

export async function generateMetadata({
  params,
}: {
  params: { route: string; subURL: string; post: string }
}): Promise<Metadata> {
  try {
    const post = await fetchPostBy({
      where: { url: params.post, deletedAt: null },
      include: { tags: { include: { tag: true } } },
    })
    if (!post) {
      return { ...defaultMeta }
    }
    return {
      title: post.title,
      description: post.description || "",
      keywords: post.tags.map(tag => tag.tag?.title || ""),
      openGraph: { title: post.title, description: post.description || "" },
    }
  } catch (error) {
    return { ...defaultMeta }
  }
}

export default function DetailPage({
  params,
}: {
  params: { route: string; subURL: string; post: string }
}) {
  const detailDefaultLayoutParams = {
    route: params.route,
    post: params.post,
    category: params.subURL,
  }
  return <DetailDefaultLayout {...detailDefaultLayoutParams} />
}
