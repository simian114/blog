"use client"

import PostCard from "@/components/postCard/PostCard"
import Typography from "@/components/typography/Typography"
import { CateogoryPost } from "@/lib/server"
import { Post } from "contentlayer/generated"
import { ReactElement, useMemo, useState } from "react"

interface CategoryListProps {
  categoryPosts: CateogoryPost[]
  className: string
  page: string
  allPosts: Post[]
}

export default function CategoryList(
  props: CategoryListProps
): ReactElement | null {
  const [currentCategory, setCurrentCategory] = useState(() => {
    if (!props.categoryPosts.length) return undefined
    return props.categoryPosts[0]
  })
  const categoryIndexPost = useMemo(
    () =>
      props.allPosts.find(post => {
        return (
          post._raw.sourceFilePath ===
          `${props.page}/${currentCategory?.category}/index.mdx`
        )
      }),
    [props.page, props.allPosts, currentCategory]
  )

  function handleClickCategory(category: string) {
    const categoryPost = props.categoryPosts.find(
      item => item.category === category
    )
    setCurrentCategory(categoryPost)
  }

  const cn = `${props.className} category-list`

  if (!props.categoryPosts.length) {
    return null
  }

  return (
    <section className={cn}>
      <section className="category-list__left">
        <Typography as="h2" variants="h2" colorType="gray" colorLevel={12}>
          카테고리
        </Typography>
        <ul className="category-list__categories">
          {props.categoryPosts.map(tree => (
            <li
              key={tree.category}
              className={`${
                tree.category === currentCategory?.category ? "active" : ""
              }`}
            >
              <button onClick={() => handleClickCategory(tree.category)}>
                <Typography
                  as="h3"
                  variants="h3"
                  colorType="gray"
                  colorLevel={11}
                  className="category-list__name"
                >
                  {tree.category}
                </Typography>
              </button>
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
          {currentCategory?.posts.map(post => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
