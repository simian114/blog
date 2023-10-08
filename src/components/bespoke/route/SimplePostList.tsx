import Link from "next/link"
import { Prisma } from "@prisma/client"
import dayjs from "dayjs"

import Typography from "@/components/typography/Typography"
import { getPostURL } from "@/helpers/model/post"
import { capitalizeFirstLetter } from "@/lib/utils"

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
      next: { tags: [`/api/post`] },
    })
    const posts = await res.json()
    return { posts }
  } catch (error) {
    return { posts: [] }
  }
}

interface SimplePostListProps {
  title?: string
}

// NOTE: revalidateTag 는 layout / page 단계에 선언해 놓은 함수에만 통하는듯...

/**
 *
 * @param {string} [title=helloworld] this is a description
 * @description this is description tag
 *
 */

export default async function SimplePostList(props: SimplePostListProps) {
  const { posts } = (await getData()) as {
    posts: Prisma.PostGetPayload<{
      include: { route: true; category: true }
    }>[]
  }
  const postsByRoute = posts.reduce(
    (prev, curr) => {
      const currentPostRoute = curr.route?.title
      if (!currentPostRoute) return prev
      if (Array.isArray(prev.get(currentPostRoute))) {
        prev.set(currentPostRoute, [
          ...(prev.get(currentPostRoute) || []),
          curr,
        ])
      } else {
        prev.set(currentPostRoute, [curr])
      }
      return prev
    },
    new Map<
      string,
      Prisma.PostGetPayload<{
        include: { route: true; category: true }
      }>[]
    >()
  )

  return (
    <>
      <br />
      <div>
        <Typography variants="h2" colorLevel={12}>
          {props.title || "All Posts"}
        </Typography>
      </div>
      <br />
      <section className="simple-post-list-wrapper">
        {Array.from(postsByRoute).map(postsWithRoute => {
          return (
            <section
              key={postsWithRoute[0]}
              className="simple-post-list-container"
            >
              <Link href={`/${postsWithRoute[1]?.[0].route?.url}`}>
                <Typography variants="h3" colorLevel={12}>
                  {capitalizeFirstLetter(postsWithRoute[0])}
                </Typography>
              </Link>

              <ul className="simple-post-list">
                {postsWithRoute[1].map(post => (
                  <li key={post.id}>
                    <Link className="simple-post" href={getPostURL(post)}>
                      <Typography
                        className="simple-post__date"
                        variants="caption1"
                      >
                        {dayjs(post.createdAt).format("MM.DD")}
                      </Typography>
                      <Typography
                        variants="subtitle1"
                        className="simple-post__title"
                      >
                        {post.title}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </section>
      <br />
    </>
  )
}
