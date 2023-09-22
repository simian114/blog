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

async function getData({
  routeId,
  categoryId,
}: {
  routeId: number
  categoryId?: number
}) {
  const params = new URLSearchParams()
  params.append("routeId", routeId.toString())
  if (typeof categoryId === "number") {
    params.append("categoryId", categoryId.toString())
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post?${params.toString()}`,
      { next: { tags: [`/api/post?${params.toString()}`] } }
    )
    const data = await res.json()
    return data
  } catch (error) {
    return []
  }
}

// NOTE: get posts
export default async function PostList(props: PostListProp) {
  const posts = await getData({
    routeId: props.routeId,
    categoryId: props.categoryId,
  })

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
