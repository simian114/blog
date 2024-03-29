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

  const sortedPosts = [...(posts || [])]
    .sort((a, b) => {
      return a.id - b.id
    })
    .filter(post => post.deletedAt === null)

  const List = PostListMapper[props.type]

  return (
    <section className="post-list__post-section">
      {props.category?.description && (
        <Typography
          as="h4"
          variants="subtitle1"
          colorType="GRAY"
          colorLevel={11}
        >
          {props.category.description}
        </Typography>
      )}
      {!!List && <List posts={sortedPosts} />}
    </section>
  )
}
