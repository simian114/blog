import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import remarkDirective from "remark-directive"
import remarkDirectiveRehype from "remark-directive-rehype"
import remarkGfm from "remark-gfm"
import { BUNDLED_LANGUAGES, getHighlighter, HighlighterOptions } from "shiki"
import githubLight from "shiki/themes/github-light.json"
import oneDarkPro from "shiki/themes/one-dark-pro.json"

import { MdxComponents } from "@/components/mdx/mdxComponents"

interface MDXProps {
  source: string
}

export default async function MDX(props: MDXProps) {
  const { content } = await compileMDX({
    source: props.source || "",
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkDirective, remarkDirectiveRehype],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: { dark: oneDarkPro, light: githubLight },
              getHighlighter: (options: HighlighterOptions) =>
                getHighlighter({
                  ...options,
                  paths: {
                    themes:
                      typeof window !== "undefined"
                        ? "https://cdn.jsdelivr.net/npm/shiki@latest/themes/"
                        : "",
                    wasm:
                      typeof window !== "undefined"
                        ? "https://cdn.jsdelivr.net/npm/shiki@latest/dist/"
                        : "",
                    languages:
                      typeof window !== "undefined"
                        ? "https://cdn.jsdelivr.net/npm/shiki@latest/languages/"
                        : "",
                  },
                  langs: [...BUNDLED_LANGUAGES],
                }),
            },
          ],
        ],
        format: "mdx",
      },
    },
    components: MdxComponents,
  })

  return <>{content}</>
}
