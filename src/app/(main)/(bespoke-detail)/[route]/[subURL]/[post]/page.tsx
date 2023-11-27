import { Metadata } from "next"

import DetailDefaultLayout, {
  PostWithComponentRoute,
} from "@/components/layout/detail/default/DetailDefaultLayout"
import { defaultMeta } from "@/constants/metadata"
import prisma from "@/lib/prisma"

export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post/${params.post}`,
      { next: { tags: [`/api/post/${params.post}`] } }
    )
    const post = (await res.json()) as PostWithComponentRoute
    if (!post) {
      return { ...defaultMeta }
    }

    return {
      title: post.title,
      description: post.description || "",
      keywords: post.tags.map(tag => tag.tag.title),
      openGraph: {
        title: post.title,
        description: post.description || "",
      },
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
