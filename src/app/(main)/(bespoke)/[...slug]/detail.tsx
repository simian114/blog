import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"

import DetailDefaultLayout from "@/components/layout/detail/default/DetailDefaultLayout"
import { MdxComponents } from "@/components/mdx/mdxComponents"
import prisma from "@/lib/prisma"

interface MainDetailProps {
  slug: string[]
}

async function getData(slug: string[]) {
  const post =
    (slug.length &&
      (await prisma.post.findFirst({
        where: {
          route: { url: `${slug[0]}` },
          category: { url: `${slug[1]}` },
          url: slug[2],
        },
        include: {
          route: true,
          category: true,
          tags: { include: { tag: true } },
        },
      }))) ||
    undefined

  return { post }
}

export default async function MainDetail(props: MainDetailProps) {
  const { post } = await getData(props.slug)
  const { content } = await compileMDX({
    source: post?.content || "",
    components: MdxComponents,
  })

  if (!post) {
    return notFound()
  }

  return <DetailDefaultLayout post={post}>{content}</DetailDefaultLayout>
}
