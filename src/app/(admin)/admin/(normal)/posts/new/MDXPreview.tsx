"use client"

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote"

import { MdxComponents } from "@/components/mdx/mdxComponents"

type MDXPreviewProsp = MDXRemoteProps

export default function MDXPreview(props: MDXPreviewProsp) {
  return <MDXRemote {...props} components={MdxComponents} />
}
