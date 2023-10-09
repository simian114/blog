import { SubUrlPost } from "@prisma/client"

import Typography from "@/components/typography/Typography"
import {
  AllIncludeCategory,
  AllIncludePost,
  AllIncludeRoute,
} from "@/types/bespoke-components"

import { PostListMapper } from "./config"

export interface PostListProp {
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

  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const List = PostListMapper[props.type]

  return (
    <section className="post-list__post-section">
      {props.category?.description && (
        <Typography
          as="h4"
          variants="subtitle1"
          colorType="GRAY"
          colorLevel={12}
        >
          {props.category.description}
        </Typography>
      )}
      {!!List && <List posts={sortedPosts} />}
    </section>
  )
}
