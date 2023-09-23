import { SubUrlPost } from "@prisma/client"

import Typography from "@/components/typography/Typography"
import {
  AllIncludeCategory,
  AllIncludePost,
  AllIncludeRoute,
} from "@/types/bespoke-components"

import { PostListMapper } from "./config"

export interface PostListProp {
  description: string
  categoryId?: number
  routeId: number
  type: SubUrlPost | string
  route: AllIncludeRoute
  category?: AllIncludeCategory
}

export default async function PostList(props: PostListProp) {
  const posts = (
    props.category
      ? props.category.posts
      : props.route.categories.map(category => category.posts).flat()
  ) as AllIncludePost[]

  const List = PostListMapper[props.type]

  return (
    <section className="post-list__post-section">
      {props.description && (
        <Typography
          as="h4"
          variants="subtitle1"
          colorType="GRAY"
          colorLevel={12}
        >
          {props.description}
        </Typography>
      )}
      {!!List && <List posts={posts} />}
    </section>
  )
}
