"use client"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"

import useDebounce from "@/lib/hooks/useDebounce"

import { AllIncludedPost } from "../[id]/page"

import { AddPostDialog } from "./add-post-dialog.client"
import MDXPreview from "./MDXPreview"

import "@uiw/react-markdown-editor/markdown-editor.css"

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then(mod => mod.default),
  { ssr: false, loading: () => <></> }
)

interface MdxEditorContainerProps {
  post?: AllIncludedPost
}

export default function MdxEditorContainer(props: MdxEditorContainerProps) {
  const [markdown, setMarkdown] = useState(
    props.post?.content || `# hello world\n # hwy?`
  )
  const debouncedMarkdown = useDebounce(markdown, 1000)
  const [source, setSource] = useState<any>()

  useEffect(() => {
    async function getMarkdown() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mdx/preview`,
        {
          method: "POST",
          body: JSON.stringify({
            source: debouncedMarkdown,
          }),
        }
      )
      const source = await res.json()
      setSource(source)
    }
    getMarkdown()
  }, [debouncedMarkdown])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row-reverse gap-4">
        <AddPostDialog content={markdown} post={props.post} />
      </div>
      {source && (
        <div>
          <MDXPreview {...source} />
        </div>
      )}
      <div className="border border-solid rounded h-full">
        <MarkdownEditor value={markdown} onChange={setMarkdown} />
      </div>
    </div>
  )
}
