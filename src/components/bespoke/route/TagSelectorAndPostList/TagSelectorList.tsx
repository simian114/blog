import { Suspense } from "react"
import { SubUrlPost, Tag } from "@prisma/client"

import TagSelectorPostList from "@/components/bespoke/route/TagSelectorAndPostList/TagSelectorPostList"
import { Post } from "@/components/postCard/PostCard"

import TagSelector from "./TagSelector"

interface TagSelectorListProps {
  tags: Tag[]
  posts: Post[]
  postType: SubUrlPost
}

export default async function TagSelectorList(props: TagSelectorListProps) {
  return (
    <>
      <ul className="tag-selector-list">
        {props.tags.map(tag => (
          <li key={tag.id}>
            <Suspense fallback={<></>}>
              <TagSelector tag={tag} />
            </Suspense>
          </li>
        ))}
      </ul>
      <Suspense fallback={<div></div>}>
        <TagSelectorPostList postType={props.postType} posts={props.posts} />
      </Suspense>
    </>
  )
}
