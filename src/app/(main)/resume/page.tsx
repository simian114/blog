import { compileMDX } from "next-mdx-remote/rsc"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"

import { MdxComponents } from "@/components/mdx/mdxComponents"
import prisma from "@/lib/prisma"

async function getData() {
  const post = await prisma.post.findFirst({
    where: { info: { url: "/resume" } },
  })
  return { post }
}

export default async function Resume() {
  const { post } = await getData()

  const { content } = await compileMDX({
    source: post?.content || "",
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
        format: "mdx",
      },
    },
    components: MdxComponents,
  })

  return <main>{content}</main>
}
