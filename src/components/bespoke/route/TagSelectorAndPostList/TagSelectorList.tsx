"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { SubUrlPost, Tag } from "@prisma/client"

import TagSelectorPostList from "@/components/bespoke/route/TagSelectorAndPostList/TagSelectorPostList"
import { Post } from "@/components/postCard/PostCard"

import TagSelector from "./TagSelector"

interface TagSelectorListProps {
  tags: Tag[]
  posts: Post[]
  postType: SubUrlPost
}

export default function TagSelectorList(props: TagSelectorListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlSearchParams = new URLSearchParams(searchParams)
  const selectedTags = searchParams.getAll("tag")

  function handleTagSelect(val: string) {
    const selected = selectedTags.includes(val)
    if (selected) {
      urlSearchParams.delete("tag")
      selectedTags
        .filter(tag => tag !== val)
        .forEach(tag => urlSearchParams.append("tag", tag))
    } else {
      urlSearchParams.append("tag", val)
    }
    router.push(`?${urlSearchParams.toString()}`)
  }

  return (
    <>
      <ul className="tag-selector-list">
        {props.tags.map(tag => {
          const selected =
            selectedTags?.includes(tag.url) || !selectedTags?.length
          return (
            <li key={tag.id}>
              <TagSelector
                tag={tag}
                selected={selected}
                handleTagSelect={() => handleTagSelect(tag.url)}
              />
            </li>
          )
        })}
      </ul>
      <TagSelectorPostList postType={props.postType} posts={props.posts} />
    </>
  )
}
