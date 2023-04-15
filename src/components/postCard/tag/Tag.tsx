import { ReactNode } from "react"

type colorType = "gray" | "primary" | "secondary" | "tertiary"

interface TagProps {
  children: ReactNode
  colorType?: colorType
}

export default function Tag(props: TagProps) {
  const cn = `tag tag-${props.colorType || "primary"}`
  return <span className={cn}>{props.children}</span>
}
