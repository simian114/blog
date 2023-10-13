import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs/promises"
import path from "path"
import rehypePrettyCode from "rehype-pretty-code"
import remarkGfm from "remark-gfm"

import { MdxComponents } from "@/components/mdx/mdxComponents"

export default async function MdxStyle() {
  const post = await fs.readFile(`${path.resolve()}/src/posts/mdx/index.mdx`)
  const options = {
    theme: {
      light: "github-light",
      dark: "one-dark-pro",
    },
  }

  const { content } = await compileMDX({
    source: post || "",
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [() => rehypePrettyCode(options)],
        format: "mdx",
      },
    },
    components: MdxComponents,
  })

  return <main>{content}</main>
}
