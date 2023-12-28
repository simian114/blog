"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Tag } from "@prisma/client"

import TagComponent from "@/components/postCard/tag/Tag"

interface TagSelectorProps {
  tag: Tag
}

// NOTE: searchParams.get 이 배열을 받을 수 있는지 알아야함
export default function TagSelector(props: TagSelectorProps) {
  const searchParams = useSearchParams()

  const urlSearchParams: any = new URLSearchParams(searchParams)
  const selectedTags = searchParams.getAll("tag")
  const isSelected = selectedTags?.includes(props.tag.url)

  if (isSelected) {
    urlSearchParams.delete("tag", props.tag.url)
  } else {
    urlSearchParams.append("tag", props.tag.url)
  }
  console.log(urlSearchParams.toString())

  return (
    <Link
      scroll={false}
      className={`tag-selector ${isSelected ? "tag-selector--selected" : ""}`}
      href={`?${urlSearchParams.toString()}`}
    >
      <TagComponent
        color={!isSelected ? "GRAY" : props.tag.color}
        tag={props.tag}
      />
    </Link>
  )
}
