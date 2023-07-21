"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { Prisma } from "@prisma/client"
import dayjs from "dayjs"

import Typography from "../typography/Typography"

import Tag from "./tag/Tag"

export type Post = Prisma.PostGetPayload<{
  include: { tags: { include: { tag: true } }; category: true; info: true }
}>

export interface PostCardProps {
  post: Post
}

export default function PostCard(props: PostCardProps) {
  const { post } = props
  const articleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const currentRef = articleRef.current
    if (!currentRef) return

    const link = currentRef.querySelector("h3 a") as HTMLAnchorElement
    if (!link) return

    let down = +new Date()
    let up = +new Date()

    function handleMouseDown() {
      down = +new Date()
    }

    function handleMouseUp() {
      up = +new Date()
      if (up - down < 200) {
        link.click()
      }
    }

    currentRef.addEventListener("mousedown", handleMouseDown)
    currentRef.addEventListener("mouseup", handleMouseUp)

    return () => {
      currentRef.removeEventListener("mousedown", handleMouseDown)
      currentRef.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      <article className="post-card" ref={articleRef}>
        <div className="post-card__meta">
          <Typography
            as="span"
            variants="body1"
            className="post-card__reading-time"
          >
            {post?.info?.readingTime}분
          </Typography>

          <Typography className="post-card__created-at" variants="caption1">
            {dayjs(post.createdAt).format("YYYY-MM-DD")}
          </Typography>
        </div>
        <div className="post-card__content">
          <Typography
            className={"post-card__title"}
            as="h3"
            variants="h3"
            colorType="gray"
            colorLevel={12}
          >
            <Link href={post.info?.url || ""}>
              {/* <Link href={props.post.slug}> */}
              {props.post.title || "post title"}
            </Link>
          </Typography>
          <Typography as="p" color="cyan" className="post-card__description">
            {post.description || "설명이 비어있습니다."}
          </Typography>
          {!!post.tags?.length && (
            <div className="post-card__tag-container">
              {post.tags.map(tag => (
                <Tag key={tag.tagId} tag={tag.tag} />
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  )
}
