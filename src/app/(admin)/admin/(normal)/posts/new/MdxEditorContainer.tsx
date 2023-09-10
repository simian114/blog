"use client"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  directivesPlugin,
  headingsPlugin,
  InsertAdmonition,
  InsertCodeBlock,
  jsxPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor"

import { AllIncludedPost } from "../[id]/page"
import MarkdownSelectInput, {
  jsxComponentDescriptors,
} from "../MarkdownComponentSelector"

import { AddPostDialog } from "./add-post-dialog.client"

import "@mdxeditor/editor/style.css"

const MDXEditor = dynamic(
  () => import("@mdxeditor/editor").then(mod => mod.MDXEditor),
  { ssr: false, loading: () => <></> }
)

interface MdxEditorContainerProps {
  post?: AllIncludedPost
}

export default function MdxEditorContainer(props: MdxEditorContainerProps) {
  const [markdown, setMarkdown] = useState(
    props.post?.content || `# hello world\n # hwy?`
  )

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row-reverse gap-4">
        <AddPostDialog content={markdown} post={props.post} />
      </div>

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
            listsPlugin(),
            headingsPlugin(),
            codeBlockPlugin(),
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
                  <InsertAdmonition />
                  <InsertCodeBlock />
                  <MarkdownSelectInput />
                </>
              ),
            }),
          ]}
        />
      </div>
    </div>
  )
}
