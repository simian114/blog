"use client"

import PostCard from "@/components/postCard/PostCard"
import Typography from "@/components/typography/Typography"
import { CateogoryPost } from "@/lib/server"
import { Post } from "contentlayer/generated"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ReactElement, useMemo } from "react"

interface CategoryListProps {
  categoryPosts: CateogoryPost[]
  className: string
  page: string
  allPosts: Post[]
  title?: string
}

export default function CategoryList(
  props: CategoryListProps
): ReactElement | null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoryPostMap = useMemo(() => {
    return new Map(props.categoryPosts.map(obj => [obj.category, obj.posts]))
  }, [props.categoryPosts])

  const defaultCategory = categoryPostMap.entries().next().value

  const currentCategory: string =
    searchParams.get("category") || defaultCategory?.[0]

  const categoryIndexPost = useMemo(
    () =>
      props.allPosts.find(post => {
        return (
          post._raw.sourceFilePath ===
          `${props.page}/${currentCategory}/index.mdx`
        )
      }),
    [props.page, props.allPosts, currentCategory]
  )

  if (!props.categoryPosts.length) {
    return null
  }

  return (
    <section className={`${props.className} category-list`}>
      <section className="category-list__left">
        <Typography as="h2" variants="h2" colorType="gray" colorLevel={12}>
          {props.title || "카테고리"}
        </Typography>
        <ul className="category-list__container">
          {props.categoryPosts.map(categoryPost => (
            <li key={categoryPost.category} className={`category-list__item`}>
              <Link
                className={`category-list__link ${
                  categoryPost.category === currentCategory ? "active" : ""
                } ${
                  categoryPost.category === currentCategory
                    ? "category-list__link--active"
                    : ""
                }`}
                href={{ pathname, search: `category=${categoryPost.category}` }}
              >
                <Typography
                  as="h3"
                  variants="h3"
                  colorType="gray"
                  colorLevel={11}
                  className="category-list__name"
                >
                  {categoryPost.category}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="category-list__right">
        <Typography as="h2" variants="h2" colorType="gray" colorLevel={12}>
          {categoryIndexPost?.title}
        </Typography>
        <Typography
          as="h4"
          variants="subtitle1"
          colorType="gray"
          colorLevel={11}
        >
          {categoryIndexPost?.description}
        </Typography>
        <ul className="category-list__posts">
          {categoryPostMap.get(currentCategory)?.map(post => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
