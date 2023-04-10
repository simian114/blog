import { Post } from "contentlayer/generated"
import { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types"

export interface SerializedPost {
  serialized: MDXRemoteSerializeResult
  frontmatter: Post
}

export interface PageProps {
  params?: {
    slug?: string[] | string
  }
  searchParams?: string[] | string
}
