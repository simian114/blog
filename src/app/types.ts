import { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types"

export type PostFrontmatter = {
  title: string
  description: string
  date: Date
  tags?: string[]
  draft: boolean
  thumbnail?: string
  icon?: string
}

export type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult
  frontmatter: TFrontmatter
}
