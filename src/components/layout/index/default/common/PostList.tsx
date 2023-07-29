import Link from "next/link"
import { ReactElement } from "react"
import { Prisma, RouteLayoutType } from "@prisma/client"

import AnchorText from "@/components/mdx/AnchorText"
import PostCard, { Post } from "@/components/postCard/PostCard"
import Typography from "@/components/typography/Typography"
import { getRDSTypographyClassName } from "@/helpers/rds/base/getRDSTypographyClassName"

import PostListTable from "./postList/PostListTable"

type CategoryWithPosts = Prisma.CategoryGetPayload<{
  include: {
    route: true
    posts: {
      include: {
        category: true
        info: true
        tags: { include: { tag: true } }
      }
    }
  }
}>

interface PostListProps {
  categories: CategoryWithPosts[]
  className: string
  type: RouteLayoutType
  currentCategory?: string
  categoryWithPosts: CategoryWithPosts
}

/**
 *
 * TODO
 *  - CategorySelector 와 PostList 를 분리시킬것
 *
 */
export default function PostList(props: PostListProps): ReactElement | null {
  const allPosts = props.categories
    .reduce((prev, cur) => {
      return [...prev, ...(cur.posts || [])]
    }, [] as Post[])
    .sort((a, b) => a.id - b.id)

  if (!props.categories.length) {
    return null
  }

  const currentRoute = props.categories?.[0]?.route?.title || ""

  return (
    <section className={`${props.className} post-list`}>
      <section className="post-list__category-section">
        <AnchorText
          className={getRDSTypographyClassName({
            weight: "bold",
            variants: "h2",
          })}
          as="h2"
        >
          Blog
        </AnchorText>
        {/* <Typography as={"p"}>블로그입니다. 아무 글이나 올라옵니다.</Typography> */}

        <ul className="post-list__category-list">
          <li
            className={`post-list__category-item ${
              !props.currentCategory ? "post-list__category-item--active" : ""
            }`}
          >
            <Link
              scroll={false}
              className={`post-list__link ${
                !props.currentCategory ? "active" : ""
              } ${!props.currentCategory ? "post-list__link--active" : ""}`}
              href={`/${currentRoute}`}
            >
              <Typography
                as="h3"
                variants="h3"
                colorType="gray"
                colorLevel={11}
                className="post-list__name"
              >
                전체
              </Typography>
            </Link>
          </li>
          {props.categories.map(category => (
            <li
              key={category.id}
              className={`post-list__category-item ${
                category.title === props.currentCategory
                  ? "post-list__category-item--active"
                  : ""
              }`}
            >
              <Link
                scroll={false}
                className={`post-list__link ${
                  category.title === props.currentCategory ? "active" : ""
                } ${
                  category.title === props.currentCategory
                    ? "post-list__link--active"
                    : ""
                }`}
                href={`/${currentRoute}/${category.title}`}
              >
                <Typography
                  as="h3"
                  variants="h3"
                  colorType="gray"
                  colorLevel={11}
                  className="post-list__name"
                >
                  {category.title}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="post-list__post-section">
        {props.categoryWithPosts?.description && (
          <Typography
            as="h4"
            variants="subtitle1"
            colorType="gray"
            colorLevel={12}
          >
            {props.categoryWithPosts?.description}
          </Typography>
        )}

        {props.type === RouteLayoutType.CARD && (
          <ul className="post-list__posts">
            {(props.categoryWithPosts?.posts || allPosts)?.map(post => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
        {props.type === RouteLayoutType.TABLE && (
          <PostListTable
            posts={
              props.currentCategory ? props.categoryWithPosts.posts : allPosts
            }
          />
        )}
      </section>
    </section>
  )
}
