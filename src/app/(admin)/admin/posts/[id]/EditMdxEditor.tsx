"use client"

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useState } from "react"

import Button from "@/components/button/Button"

import { editPost } from "./actions"
import { AllIncludedPost } from "./page"

import "@mdxeditor/editor/style.css"

const MDXEditor = dynamic(
  () => import("@mdxeditor/editor").then(mod => mod.MDXEditor),
  { ssr: false, loading: () => <div> client loading</div> }
)

interface EditMDXEditorProps {
  post: AllIncludedPost
}

export default function EditMDXEditor(props: EditMDXEditorProps) {
  const [markdown, setMarkdown] = useState(() => props.post.content || "")
  const router = useRouter()
  async function handleOnEdit() {
    await editPost({
      id: props.post.id,
      data: {
        content: markdown,
      },
    })
    router.push("/admin/posts")
  }
  return (
    <div>
      {/* <EditPostDialog post={props.post} content={markdown} /> */}
      <Button onClick={handleOnEdit}>수정</Button>
      <div className="flex flex-row-reverse">{/* <EditPo */}</div>
      <MDXEditor
        markdown={markdown}
        onChange={setMarkdown}
        contentEditableClassName="mdx"
      />
    </div>
  )
}
