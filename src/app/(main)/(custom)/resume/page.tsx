import { compileMDX } from "next-mdx-remote/rsc"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"

import { MdxComponents } from "@/components/mdx/mdxComponents"
import { fetchPostBy } from "@/helpers/data/post"

async function getData() {
  const post = await fetchPostBy({
    where: { route: { url: "/resume" } },
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
