"use client"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import { json } from "stream/consumers"

import ThemeToggler from "@/components/theme/ThemeToggler"
import useDebounce from "@/lib/hooks/useDebounce"
import { useCurrentAppliedTheme } from "@/store/theme"

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

const MARKDOWN_DEFAULT_VALUE = `
## Write your own story!

\`\`\`js /cyan/#cyan /pink/#pink /yellow/#yellow {6} title="this is title" caption="this is caption"
import React from "react"

export default function App() {
  return (
    <div>
     <div>highlight line</div>
     <div>highlight cyan</div>
     <div>highlight pink</div>
     <div>highlight yellow</div>
    </div>
  )
}
\`\`\`

`

export default function MdxEditorContainer(props: MdxEditorContainerProps) {
  const currentTheme = useCurrentAppliedTheme()
  const [markdown, setMarkdown] = useState(MARKDOWN_DEFAULT_VALUE)
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
        <ThemeToggler />
        <AddPostDialog content={markdown} post={props.post} />
      </div>
      <div className="border border-solid rounded h-full">
        <MarkdownEditor value={markdown} onChange={setMarkdown} />
      </div>
      {source && (
        <div
          style={{
            backgroundColor: currentTheme === "dark" ? "#151718" : "white",
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          <MDXPreview {...source} />
        </div>
      )}
    </div>
  )
}
