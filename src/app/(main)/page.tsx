import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs/promises"
import path from "path"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"

import { MdxComponents } from "@/components/mdx/mdxComponents"

// NOTE: Home router 는 custom router.
export default async function Home() {
  const post = await fs.readFile(`${path.resolve()}/src/posts/index.mdx`)
  const { content } = await compileMDX({
    source: post || "",
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
