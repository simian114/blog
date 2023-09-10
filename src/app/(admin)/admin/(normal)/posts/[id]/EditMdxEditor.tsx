"use client"

import MdxEditorContainer from "../new/MdxEditorContainer"

import { AllIncludedPost } from "./page"

import "@mdxeditor/editor/style.css"

interface EditMDXEditorProps {
  post: AllIncludedPost
}

export default function EditMDXEditor(props: EditMDXEditorProps) {
  return (
    <div>
      <MdxEditorContainer post={props.post} />
    </div>
  )
}
