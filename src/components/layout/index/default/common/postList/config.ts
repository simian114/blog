import { ReactElement } from "react"
import { SubUrlPost } from "@prisma/client"

import { Post } from "@/components/postCard/PostCard"

import PostCardList from "./PostCardList"
import PostListTable from "./PostListTable"

export const PostListMapper: {
  [key in SubUrlPost]?: (props: { posts: Post[] }) => ReactElement
} = {
  [SubUrlPost.CARD]: PostCardList,
  [SubUrlPost.TABLE]: PostListTable,
}
