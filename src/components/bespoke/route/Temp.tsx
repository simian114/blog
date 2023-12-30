import Link from "next/link"
import { Prisma } from "@prisma/client"
import dayjs from "dayjs"

import { fetchPostList } from "@/helpers/data/post"
import { getPostURL } from "@/helpers/model/post"
import { capitalizeFirstLetter } from "@/lib/utils"

import Typography from "../../typography/Typography"

type Post = Prisma.PostGetPayload<{
  include: {
    route: true
    category: true
  }
}>

async function getData() {
  const posts = await fetchPostList({
    where: {
      published: true,
    },
    include: {
      route: true,
      category: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  return { posts }
}

interface SimplePostListProps {
  title?: string
}

/**
 *
 * @param {string} [temp=helloworld] this is a description
 * @param {string} [ temp2 ] this is a description2
 * @param {string} temp3 this is a
 * with new line
 * @description this is description tag
 *
 */

export default async function Temp(props: SimplePostListProps) {
  const { posts } = await getData()
  const postsByRoute = posts.reduce((prev, curr) => {
    const currentPostRoute = curr.route?.title
    if (!currentPostRoute) return prev
    if (Array.isArray(prev.get(currentPostRoute))) {
      prev.set(currentPostRoute, [...(prev.get(currentPostRoute) || []), curr])
    } else {
      prev.set(currentPostRoute, [curr])
    }
    return prev
  }, new Map<string, Post[]>())
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
