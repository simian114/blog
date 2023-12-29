import { Suspense } from "react"
import { Post, SubUrlPost, Tag } from "@prisma/client"

import TagSelectorList from "@/components/bespoke/route/TagSelectorAndPostList/TagSelectorList"
import TagSelectorAndPostListLoading from "@/components/bespoke/route/TagSelectorAndPostListLoading"
import Typography from "@/components/typography/Typography"
import { AllIncludePost } from "@/types/bespoke-components"

async function getData() {
  try {
    const fetchPosts = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post`,
      {
        next: { tags: [`/api/post`] },
      }
    )
    const fetchTags = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tag`,
      { next: { tags: [`/api/tag`] } }
    )
    const posts = (await fetchPosts.json()) as AllIncludePost[]
    const tags = (await fetchTags.json()) as Tag[]

    return { posts: posts.filter((post: Post) => !post.deletedAt), tags }
  } catch (error) {
    return { posts: [], tags: [] }
  }
}

interface TagSelectorAndPostListProps {
  postType: string // SubUrlPost
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
      <Suspense fallback={<TagSelectorAndPostListLoading />}>
        <TagSelectorList
          tags={tags}
          posts={posts}
          postType={props.postType as SubUrlPost}
        />
      </Suspense>
    </section>
  )
}
