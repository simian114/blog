import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import remarkDirective from "remark-directive"
import remarkDirectiveRehype from "remark-directive-rehype"
import remarkGfm from "remark-gfm"

import { MdxComponents } from "@/components/mdx/mdxComponents"

import "shiki"
import "shiki/themes/one-dark-pro.json"
import "shiki/themes/github-light.json"

interface MDXProps {
  source: string
}

export default async function MDX(props: MDXProps) {
  const options = {
    theme: {
      light: "github-light",
      dark: "one-dark-pro",
    },
  }

  const { content } = await compileMDX({
    source: props.source || "",
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkDirective, remarkDirectiveRehype],
        rehypePlugins: [() => rehypePrettyCode(options)],
        format: "mdx",
      },
    },
    components: MdxComponents,
  })

  return <>{content}</>
}
