import { Suspense } from "react"
import { Post, SubUrlPost } from "@prisma/client"

import TagSelectorList from "@/components/bespoke/route/TagSelectorAndPostList/TagSelectorList"
import TagSelectorAndPostListLoading from "@/components/bespoke/route/TagSelectorAndPostListLoading"
import Typography from "@/components/typography/Typography"
import { fetchPostList } from "@/helpers/data/post"
import { fetchTagList } from "@/helpers/data/tag"

async function getData() {
  try {
    const posts = await fetchPostList({
      where: { deletedAt: null },
      include: {
        route: true,
        category: true,
        tags: { include: { tag: true } },
      },
    })
    const tags = await fetchTagList()
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
