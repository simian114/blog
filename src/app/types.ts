import { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types"

export type PostFrontmatter = {
  title: string
  description: string
  date: Date
  tags?: string[]
  isPublished: boolean
  thumbnail?: string
}

export interface Post<TFrontmatter> {
  serialized: MDXRemoteSerializeResult
  frontmatter: TFrontmatter
}

export interface PageProps {
  params?: {
    slug?: string[] | string
  }
  searchParams?: string[] | string
}
