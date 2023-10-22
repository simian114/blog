"use client"

import MdxEditorContainer from "../new/MdxEditorContainer"

import { AllIncludedPost } from "./page"

interface EditMDXEditorProps {
  post: AllIncludedPost
}

export default function EditMDXEditor(props: EditMDXEditorProps) {
  return <MdxEditorContainer post={props.post} />
}
