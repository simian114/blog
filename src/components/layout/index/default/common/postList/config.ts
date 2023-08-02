import { ReactElement } from "react"
import { RouteLayoutType } from "@prisma/client"

import { Post } from "@/components/postCard/PostCard"

import PostCardList from "./PostCardList"
import PostListTable from "./PostListTable"

export const PostListMapper: {
  [key in RouteLayoutType]?: (props: { posts: Post[] }) => ReactElement
} = {
  [RouteLayoutType.CARD]: PostCardList,
  [RouteLayoutType.TABLE]: PostListTable,
}
