"use client"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { EditorSelection, ReactCodeMirrorRef } from "@uiw/react-codemirror"
import { type PutBlobResult } from "@vercel/blob"
import { LucideUpload } from "lucide-react"

import ThemeToggler from "@/components/theme/ThemeToggler"
import useDebounce from "@/lib/hooks/useDebounce"
import { useCurrentAppliedTheme } from "@/store/theme"

import { AllIncludedPost } from "../[id]/page"

import { AddPostDialog } from "./add-post-dialog.client"
import FileUploadDialog from "./FileUploadDialog"
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
  const [markdown, setMarkdown] = useState(
    props.post?.content ?? MARKDOWN_DEFAULT_VALUE
  )
  const debouncedMarkdown = useDebounce(markdown, 1000)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [source, setSource] = useState<any>()

  const [imageUploadDialog, setImageUploadDialog] = useState(false)
  const ref = useRef<ReactCodeMirrorRef>()

  function handleImageUploadSuceess(blob: PutBlobResult) {
    if (!ref.current) {
      return
    }
    const { state, view } = ref.current
    if (!state || !view) {
      return
    }
    const insert = `![image title](${blob.url})`

    view.dispatch(
      view.state.changeByRange(range => ({
        changes: [{ from: range.from, insert }],
        range: EditorSelection.range(range.from + 2, range.to + 2),
      }))
    )
    setImageUploadDialog(false)
  }

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

  const imageUpload = {
    name: "image upload",
    keyCommand: "image upload",
    button: { "aria-label": "image upload button" },
    icon: <LucideUpload width={16} height={16} />,

    execute: (mirror: ReactCodeMirrorRef) => {
      ref.current = mirror
      setImageUploadDialog(true)
    },
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <FileUploadDialog
        onSuccess={handleImageUploadSuceess}
        open={imageUploadDialog}
        onOpenChange={setImageUploadDialog}
      />
      <div className="flex gap-4">
        <ThemeToggler />
        <AddPostDialog content={markdown} post={props.post} />
      </div>
      <div className="flex flex-row w-full gap-16">
        <div className="flex-1 border border-solid rounded max-w-[50%]">
          <MarkdownEditor
            value={markdown}
            onChange={setMarkdown}
            enablePreview={false}
            toolbars={[
              "undo",
              "redo",
              "bold",
              "italic",
              "header",
              "strike",
              "underline",
              "quote",
              "olist",
              "ulist",
              "todo",
              "link",
              "image",
              "code",
              "codeBlock",
              "fullscreen",
              imageUpload,
            ]}
          />
        </div>
        {source && (
          <div
            className="flex-1"
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
    </div>
  )
}
