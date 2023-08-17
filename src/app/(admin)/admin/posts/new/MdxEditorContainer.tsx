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
  GenericJsxEditor,
  headingsPlugin,
  InsertAdmonition,
  InsertCodeBlock,
  JsxComponentDescriptor,
  jsxPlugin,
  jsxPluginHooks,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditorMethods,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor"
import { Tag } from "@prisma/client"

import Button from "@/components/button/Button"

import { AddPostDialog } from "./add-post-dialog.client"
import { RouteWithCategories } from "./page"

import "@mdxeditor/editor/style.css"

const MDXEditor = dynamic(
  () => import("@mdxeditor/editor").then(mod => mod.MDXEditor),
  { ssr: false, loading: () => <></> }
)

interface MdxEditorContainerProps {
  tags: Tag[]
  routes: RouteWithCategories[]
}

export default function MdxEditorContainer(props: MdxEditorContainerProps) {
  const [markdown, setMarkdown] = useState(`# hello world\n # hwy?`)
  const ref = React.useRef<MDXEditorMethods>(null)

  // NOTE: 공백 컴포넌트
  const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    {
      name: "br",
      kind: "flow",
      source: "source is not important",
      defaultExport: true,
      props: [{ name: "foo", type: "string" }],
      Editor: GenericJsxEditor,
    },
  ]

  const InsertBR = () => {
    const insertJsx = jsxPluginHooks.usePublisher("insertJsx")
    return (
      <Button
        onClick={() =>
          insertJsx({
            name: "br",
            kind: "flow",
            props: { foo: "bar", bar: "baz" },
          })
        }
      >
        InsertBR
      </Button>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row-reverse gap-4">
        <AddPostDialog
          content={markdown}
          allTags={props.tags}
          allRoutes={props.routes}
        />
        <Button design={{ type: "secondary" }} className="self-end">
          임시 저장
        </Button>
      </div>

      <div className="border border-solid rounded h-full">
        <MDXEditor
          ref={ref}
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
                  <InsertBR />
                </>
              ),
            }),
          ]}
        />
      </div>
    </div>
  )
}
