"use client"

import { useSearchParams } from "next/navigation"
import { SubUrlPost } from "@prisma/client"

import { PostListMapper } from "@/components/layout/index/default/common/postList/config"
import { Post } from "@/components/postCard/PostCard"

interface TagSelectorPostListProps {
  posts: Post[]
  postType: SubUrlPost
}

export default function TagSelectorPostList(props: TagSelectorPostListProps) {
  const ListComponent = PostListMapper[props.postType || SubUrlPost.CARD]
  const searchParams = useSearchParams()
  const tags = searchParams.getAll("tag")
  const filteredPost = !tags?.length
    ? props.posts
    : props.posts.filter(post =>
        post.tags.some(tag => tags.includes(tag.tag.url))
      )
  if (!ListComponent) {
    return null
  }

  return <ListComponent posts={filteredPost} />
}
