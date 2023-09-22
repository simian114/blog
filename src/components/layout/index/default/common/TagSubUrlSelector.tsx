import { Route } from "@prisma/client"

import Typography from "@/components/typography/Typography"
import prisma from "@/lib/prisma"

import { PostListMapper } from "./postList/config"
import TagSelectorList from "./tagSelectorList/TagSelectorList"

interface TagSubURLSelectorProps {
  currentRoute: Route
  subURL: string
}

async function getData() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      route: true,
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })
  return { posts }
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
