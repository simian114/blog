import { useState } from "react"
import {
  GenericJsxEditor,
  JsxComponentDescriptor,
  jsxPluginHooks,
} from "@mdxeditor/editor"

import Button from "@/components/magicButton/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MarkdownComponents } from "@/constants/bespoke-components"
import { MARKDOWN_COMPONENT_LIST } from "@/constants/components"
import { wait } from "@/lib/utils"
import { MarkdownComponentNameType } from "@/types/bespoke-components"

export const jsxComponentDescriptors: JsxComponentDescriptor[] =
  MARKDOWN_COMPONENT_LIST.map(name => {
    const {
      hasChildren: hasChildrenProp,
      kind: kindProp,
      ...rest
    } = MarkdownComponents[name]
    const hasChildren = hasChildrenProp.default === "true" ? true : false

    const kind =
      kindProp.type === "flow" || kindProp.type === "text"
        ? kindProp.type
        : "flow"

    const props = Object.entries(rest).map(([name, value]) => {
      const type =
        value.type === "string" || value.type === "number"
          ? value.type
          : "string"

      return {
        name,
        type,
        required: false,
      }
    })

    return {
      name,
      kind,
      hasChildren,
      defaultExport: true,
      source: "",
      props,
      Editor: GenericJsxEditor,
    } as JsxComponentDescriptor
  })

export default function MarkdownSelectInput() {
  const [open, setOpen] = useState(false)

  const insertJsx = jsxPluginHooks.usePublisher("insertJsx")
  function handleSelectComponent(v: MarkdownComponentNameType) {
    insertJsx({
      name: v,
      kind: "flow",
      props: {},
    })
    wait(500).then(() => setOpen(false))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>컴포넌트 삽입</Button>
      </DialogTrigger>
      <DialogContent className="border-solid">
        <DialogHeader>
          <DialogTitle>컴포넌트 삽입</DialogTitle>
          <DialogDescription>
            <Select
              onValueChange={v =>
                handleSelectComponent(v as MarkdownComponentNameType)
              }
            >
              <SelectTrigger className="border-solid">
                <SelectValue placeholder="삽입할 컴포넌트를 선택해주세요.!" />
              </SelectTrigger>
              <SelectContent>
                {MARKDOWN_COMPONENT_LIST.map(componentName => (
                  <SelectItem key={componentName} value={componentName}>
                    <div className="flex flex-row gap-4">
                      <span>{componentName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
