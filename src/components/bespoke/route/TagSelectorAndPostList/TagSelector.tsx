"use client"

import { Tag } from "@prisma/client"

import TagComponent from "@/components/postCard/tag/Tag"

interface TagSelectorProps {
  tag: Tag
  handleTagSelect: () => void
  selected: boolean
}

// NOTE: searchParams.get 이 배열을 받을 수 있는지 알아야함
export default function TagSelector(props: TagSelectorProps) {
  return (
    <button
      className={`tag-selector ${
        props.selected ? "tag-selector--selected" : ""
      }`}
      onClick={props.handleTagSelect}
    >
      <TagComponent
        color={!props.selected ? "GRAY" : props.tag.color}
        tag={props.tag}
      />
    </button>
  )
}
