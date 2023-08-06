import Link from "next/link"
import { Route, Tag } from "@prisma/client"

import TagComponent from "@/components/postCard/tag/Tag"

interface TagSelectorProps {
  route: Route
  tag: Tag
  selected: boolean
}

export default function TagSelector(props: TagSelectorProps) {
  return (
    <Link
      className={`tag-selector ${
        props.selected ? "tag-selector--selected" : ""
      }`}
      href={
        props.selected
          ? `/${props.route.url}`
          : `/${props.route.url}/${props.tag.url}`
      }
    >
      <TagComponent
        color={!props.selected ? "gray" : undefined}
        tag={props.tag}
      />
    </Link>
  )
}
