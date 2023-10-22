import { Post, Route } from "@prisma/client"

import Typography from "@/components/typography/Typography"
import prisma from "@/lib/prisma"
import { AllIncludePost } from "@/types/bespoke-components"

import { PostListMapper } from "./postList/config"
import TagSelectorList from "./tagSelectorList/TagSelectorList"

interface TagSubURLSelectorProps {
  currentRoute: Route
  subURL: string
}

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
      next: { tags: [`/api/post`] },
    })
    const posts = (await res.json()) as AllIncludePost[]
    return { posts: posts.filter((post: Post) => !post.deletedAt) }
  } catch (error) {
    return { posts: [] }
  }
}

export default async function TagSubURLSelector(props: TagSubURLSelectorProps) {
  const { posts } = await getData()
  const List = PostListMapper["CARD"]
  // NOTE: posts 는 전부 불러온다?
  const filteredPost = props.subURL
    ? posts.filter(
        post => !!post.tags.find(tag => tag.tag.url === props.subURL)
      )
    : posts

  if (!List) {
    return <></>
  }

  return (
    <section>
      <Typography colorType="GRAY" colorLevel={12} variants="h2">
        Tag
      </Typography>
      <TagSelectorList
        currentTagURL={props.subURL}
        route={props.currentRoute}
      />
      <List posts={filteredPost} />
    </section>
  )
}
