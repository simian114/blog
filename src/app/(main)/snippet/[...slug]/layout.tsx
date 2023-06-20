import { Metadata } from "next"
import { ReactNode } from "react"

import DetailDefaultLayout from "@/components/layout/detail/default/_default"
import { defaultMeta, openGraphImage } from "@/constants/metadata"
import { allPublishedPost } from "@/constants/post"

export function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Metadata {
  const post = allPublishedPost.find(post =>
    post.slug.endsWith(params.slug.join("/"))
  )

  const title = `Recketman${post?.title ? `| ${post.title}` : ``}`
  const description = post?.description || defaultMeta.description
  return {
    ...defaultMeta,
    title,
    description,
    openGraph: {
      ...defaultMeta,
      title,
      description,
      ...openGraphImage,
    },
  }
}

export default async function BlogDetail({
  params,
  children,
}: {
  params: { slug: string[] }
  children: ReactNode
}) {
  const { slug } = params

  return <DetailDefaultLayout slug={slug}>{children}</DetailDefaultLayout>
}
