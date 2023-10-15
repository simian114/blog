import { NextRequest } from "next/server"
import { serialize } from "next-mdx-remote/serialize"
import * as fs from "fs/promises"
import { join as pathJoin } from "path"
import rehypePrettyCode from "rehype-pretty-code"
import remarkDirective from "remark-directive"
import remarkDirectiveRehype from "remark-directive-rehype"
import remarkGfm from "remark-gfm"
import { HighlighterOptions } from "shiki"
import * as shiki from "shiki"

const getShikiPath = (): string => {
  return pathJoin(process.cwd(), "src/lib/shiki")
}

const touched = { current: false }

// LINK: https://github.com/vercel/next.js/issues/52711
// NOTE: 위 링크에 on demand revalidate 시 에러 해결 방법 나와있음

// "Touch" the shiki assets so that Vercel will include them in the production
// bundle. This is required because shiki itself dynamically access these files,
// so Vercel doesn't know about them by default
const touchShikiPath = (): void => {
  if (touched.current) return // only need to do once
  fs.readdir(getShikiPath()) // fire and forget
  touched.current = true
}

const getHighlighter = async (options: HighlighterOptions) => {
  touchShikiPath()

  const highlighter = await shiki.getHighlighter({
    // This is technically not compatible with shiki's interface but
    // necessary for rehype-pretty-code to work
    // - https://rehype-pretty-code.netlify.app/ (see Custom Highlighter)
    ...(options as any),
    paths: {
      languages: `${getShikiPath()}/languages/`,
      themes: `${getShikiPath()}/themes/`,
    },
  })

  return highlighter
}

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const source = body.source

  const serialized = await serialize(source || "", {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkDirective, remarkDirectiveRehype],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: { dark: "one-dark-pro", light: "github-light" },
            getHighlighter,
          },
        ],
      ],
      format: "mdx",
    },
  })
  return new Response(JSON.stringify(serialized))
}
