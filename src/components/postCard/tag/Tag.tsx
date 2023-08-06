import { Tag } from "@prisma/client"

type colorType = "gray" | "primary" | "secondary" | "tertiary"

interface TagProps {
  tag: Tag
  color?: colorType
}

export default function Tag(props: TagProps) {
  const cn = `tag tag-${
    props.color || props.tag.color?.toLowerCase() || "primary"
  }`
  return <span className={cn}>{props.tag.title}</span>
}
