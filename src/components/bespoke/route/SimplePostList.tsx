import Link from "next/link"
import { Prisma } from "@prisma/client"
import dayjs from "dayjs"

import Motion from "@/components/motion/Motion"
import Typography from "@/components/typography/Typography"
import { fetchPostList } from "@/helpers/data/post"
import { getPostURL } from "@/helpers/model/post"
import { capitalizeFirstLetter } from "@/lib/utils"

const params = {
  where: { deletedAt: null },
  include: {
    route: true,
    category: true,
    tags: { include: { tag: true } },
  },
}

async function getData() {
  const posts = await fetchPostList(params)
  return posts
}

// NOTE: revalidateTag 는 layout / page 단계에 선언해 놓은 함수에만 통하는듯...

/**
 *
 * @param {string} [title=helloworld] this is a description
 * @description this is description tag
 *
 */

interface SimplePostListProps {
  title?: string
}

export default async function SimplePostList(props: SimplePostListProps) {
  const posts = await getData()
  const postsByRoute = posts.reduce((prev, curr) => {
    const currentPostRoute = curr.route?.title
    if (!currentPostRoute) return prev
    if (Array.isArray(prev.get(currentPostRoute))) {
      prev.set(currentPostRoute, [...(prev.get(currentPostRoute) || []), curr])
    } else {
      prev.set(currentPostRoute, [curr])
    }
    return prev
  }, new Map<string, Prisma.PostGetPayload<typeof params>[]>())

  /**
   * 다음 section 의 시작 시점은 이전 section 의 애니메이션이 마무리되고 0.1초 후 로 한다.
   * cumulative 하게 시간을 세야한다.
   * 이전 섹션의 총 애니메이션 시간은 title + items 의 개수의 총합이다.
   *
   */

  let delay = -0.1
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
          delay = delay + 0.1
          return (
            <Motion
              as={"section"}
              key={postsWithRoute[0]}
              className="simple-post-list-container"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ delay }}
            >
              <Link href={`/${postsWithRoute[1]?.[0].route?.url}`}>
                <Typography variants="h3" colorLevel={12}>
                  {capitalizeFirstLetter(postsWithRoute[0])}
                </Typography>
              </Link>

              <ul className="simple-post-list">
                {postsWithRoute[1].map(post => {
                  delay = delay + 0.1
                  return (
                    <Motion
                      as="li"
                      key={post.id}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay,
                      }}
                    >
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
                    </Motion>
                  )
                })}
              </ul>
            </Motion>
          )
        })}
      </section>
      <br />
    </>
  )
}
