import { existsSync } from "fs"
import { isDirectory } from "./files.server"
import { PostFrontmatter, Post } from "@/app/types"
import { serialize } from "next-mdx-remote/serialize"
import { promises as fs } from "fs"
import rehypeHighlight from "rehype-highlight"
import langJavascript from "highlight.js/lib/languages/javascript"
import langCSS from "highlight.js/lib/languages/css"
import "highlight.js/styles/a11y-dark.css"
import { notFound } from "next/navigation"

const languages = {
  javascript: langJavascript,
  css: langCSS,
}

export async function readPost(
  filepath: string
): Promise<Post<PostFrontmatter>> {
  // Read the file from the filesystem

  const raw = await fs
    .readFile(filepath, "utf-8")
    .then(raw => raw)
    .catch(() => notFound())

  // Serialize the MDX content and parse the frontmatter
  const serialized = await serialize(raw, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [
        [
          rehypeHighlight,
          {
            ignoreMissing: true,
            languages,
          },
        ],
      ],
    },
  })

  // Typecast the frontmatter to the correct type
  const frontmatter = serialized.frontmatter as PostFrontmatter

  // Return the serialized content and frontmatter
  return {
    frontmatter,
    serialized,
  }
}

/**
 * 파일이라면 파일 정보만 index.mdx 에서 읽어온다.
 * 폴더라면 index.mdx 에서 폴더 정보를 읽어오고, 폴더 리스트를 통해 collection 리스트를 불러옴
 */
async function getInfoByCurrentPath(path: string) {
  // 1. check file exists
  // 2. check folder. if not folder return null;
  //

  if (!existsSync(path)) {
    return {
      frontmatter: { title: "", date: "" },
      serialized: null,
    }
  }
  const isDir = await isDirectory(path)
  // dir 이면 index.mdx, 아니면 현재 위치
  const filePath = isDir ? path + "/index.mdx" : path
  const { frontmatter, serialized } = await readPost(filePath)

  // const files = readdirSync(directoryName)
  // console.log({ files })
  // files.map(file =>
  //   console.log(file, lstatSync(`${directoryName}/${file}`).isDirectory())
  // )
  return { frontmatter, serialized }
}

export { getInfoByCurrentPath }
