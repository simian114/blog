import { SubUrlPost } from "@prisma/client"

import Typography from "@/components/typography/Typography"
import prisma from "@/lib/prisma"

import { PostListMapper } from "./config"

export interface PostListProp {
  description: string
  categoryId?: number
  routeId: number
  type: SubUrlPost | string
}

async function getData({ routeId }: { routeId: number }) {
  const posts = await prisma.post.findMany({
    where: {
      routeId,
    },
    include: {
      route: true,
      category: true,
      tags: { include: { tag: true } },
    },
  })
  return posts
}

export default async function PostList(props: PostListProp) {
  const allPosts = await getData({ routeId: props.routeId })
  const posts = allPosts.filter(post => post.categoryId === props.categoryId)
  const List = PostListMapper[props.type]

  return (
    <section className="post-list__post-section">
      {props.description && (
        <Typography
          as="h4"
          variants="subtitle1"
          colorType="gray"
          colorLevel={12}
        >
          {props.description}
        </Typography>
      )}
      {!!List && <List posts={props.categoryId ? posts : allPosts} />}
    </section>
  )
}
