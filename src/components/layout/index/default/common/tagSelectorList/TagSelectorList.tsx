import { Route } from "@prisma/client"

import prisma from "@/lib/prisma"

import TagSelector from "./TagSelector"

interface TagSelectorProps {
  currentTagURL?: string
  route: Route
}

async function getData() {
  const tags = await prisma.tag.findMany({
    include: { posts: true },
  })
  return { tags }
}

export default async function TagSelectorList(props: TagSelectorProps) {
  const { tags } = await getData()
  const tagsHasPost = tags.filter(tag => !!tag.posts?.length)

  return (
    <ul className="tag-selector-list">
      {tagsHasPost.map(tag => (
        <li key={tag.id}>
          <TagSelector
            route={props.route}
            selected={tag.url === props.currentTagURL}
            tag={tag}
          />
        </li>
      ))}
    </ul>
  )
}
