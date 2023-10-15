"use client"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeBlockEditorDescriptor,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  directivesPlugin,
  headingsPlugin,
  InsertAdmonition,
  InsertCodeBlock,
  jsxPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  useCodeBlockEditorContext,
} from "@mdxeditor/editor"

import useDebounce from "@/lib/hooks/useDebounce"

import { AllIncludedPost } from "../[id]/page"
import MarkdownSelectInput, {
  jsxComponentDescriptors,
} from "../MarkdownComponentSelector"

import { AddPostDialog } from "./add-post-dialog.client"
import MDXPreview from "./MDXPreview"

import "@uiw/react-markdown-editor/markdown-editor.css"
import "@mdxeditor/editor/style.css"

const MDXEditor = dynamic(
  () => import("@mdxeditor/editor").then(mod => mod.MDXEditor),
  { ssr: false, loading: () => <></> }
)

// const MarkdownEditor = dynamic(
//   () => import("@uiw/react-markdown-editor").then(mod => mod.default),
//   { ssr: false, loading: () => <></> }
// )

interface MdxEditorContainerProps {
  post?: AllIncludedPost
}

export default function MdxEditorContainer(props: MdxEditorContainerProps) {
  const [markdown, setMarkdown] = useState(
    props.post?.content || `# hello world\n # hwy?`
  )
  const debouncedMarkdown = useDebounce(markdown, 1000)
  const [source, setSource] = useState<any>()
  // NOTE: meta 가 들어가면 터짐. 터지지 않기 위해 이렇게 하면 스타일이 없게됨. 해결할것
  const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
    // always use the editor, no matter the language or the meta of the code block
    match: (language, meta) => {
      console.log({ meta })
      console.log({ language })
      return true
    },
    priority: 0,
    Editor: props => {
      const cb = useCodeBlockEditorContext()
      return (
        <>
          <div
            onKeyDown={e => e.nativeEvent.stopImmediatePropagation()}
            style={{ width: "100%" }}
          >
            <textarea
              style={{ width: "100%" }}
              rows={3}
              cols={20}
              defaultValue={props.code}
              onChange={e => cb.setCode(e.target.value)}
            />
          </div>
        </>
      )
    },
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
        <MDXEditor
          markdown={markdown}
          onChange={setMarkdown}
          contentEditableClassName="mdx"
          plugins={[
            jsxPlugin({ jsxComponentDescriptors }),
            listsPlugin(),
            directivesPlugin({
              directiveDescriptors: [AdmonitionDirectiveDescriptor],
            }),
            linkPlugin(),
            linkDialogPlugin({}),
            listsPlugin(),
            headingsPlugin(),
            codeBlockPlugin({
              codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor],
              defaultCodeBlockLanguage: "js",
            }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: "JavaScript",
                jsx: "JavaScript",
                css: "CSS",
                c: "C",
                sh: "Shell",
                scss: "SCSS",
                sass: "Sass",
                go: "Go",
                lua: "Lua",
              },
            }),
            quotePlugin(),
            markdownShortcutPlugin(),
            thematicBreakPlugin(),
            diffSourcePlugin({
              diffMarkdown: "An older version",
              viewMode: "rich-text",
            }),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <DiffSourceToggleWrapper>
                    <UndoRedo />
                  </DiffSourceToggleWrapper>
                  <UndoRedo />
                  <BlockTypeSelect />
                  <BoldItalicUnderlineToggles />
                  <CodeToggle />
                  <CreateLink />
                  <InsertCodeBlock />
                  <MarkdownSelectInput />
                  <InsertAdmonition />
                </>
              ),
            }),
          ]}
        />
      </div>
    </div>
  )
}
