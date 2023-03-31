import { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types"

export type PostFrontmatter = {
  title: string
  date: string
}

export type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult
  frontmatter: TFrontmatter
}
