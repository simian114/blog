import { Post, SubUrlPost } from "@prisma/client"
import { PrismaClient } from "@prisma/client"

import TagSelectorList from "@/components/bespoke/route/TagSelectorAndPostList/TagSelectorList"
import Typography from "@/components/typography/Typography"
import { AllIncludePost } from "@/types/bespoke-components"

const prisma = new PrismaClient()
async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
      next: { tags: [`/api/post`] },
    })
    const posts = (await res.json()) as AllIncludePost[]
    const tags = await prisma.tag.findMany({
      include: { posts: true },
    })
    return { posts: posts.filter((post: Post) => !post.deletedAt), tags }
  } catch (error) {
    return { posts: [], tags: [] }
  }
}

interface TagSelectorAndPostListProps {
  postType: string
  // postType: SubUrlPost
}

/**
 *
 * @param {string} [postType=card]
 * @description this is description tag
 *
 */

export default async function TagSelectorAndPostList(
  props: TagSelectorAndPostListProps
) {
  const { posts, tags } = await getData()

  return (
    <section>
      <Typography colorType="GRAY" colorLevel={12} variants="h2">
        Tag
      </Typography>
      <TagSelectorList
        tags={tags}
        posts={posts}
        postType={props.postType as SubUrlPost}
      />
    </section>
  )
}
