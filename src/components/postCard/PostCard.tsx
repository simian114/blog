"use client"

import { Post } from "contentlayer/generated"
import Link from "next/link"
import Tag from "./tag/Tag"
import dayjs from "dayjs"
import { useEffect, useRef } from "react"
import Typography from "../typography/Typography"

interface PostCardProps {
  post: Post
}

export default function PostCard(props: PostCardProps) {
  const { post } = props
  const articleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!articleRef.current) return
    const link = articleRef.current.querySelector("h3 a")
    if (!link) return

    let down = +new Date()
    let up = +new Date()

    function handleMouseDown() {
      down = +new Date()
    }

    function handleMouseUp() {
      up = +new Date()
      if (up - down < 200) {
        link && (link as unknown as HTMLElement).click()
      }
    }

    articleRef.current.addEventListener("mousedown", handleMouseDown)
    articleRef.current.addEventListener("mouseup", handleMouseUp)
    return () => {
      if (!articleRef.current) return
      articleRef.current.removeEventListener("mousedown", handleMouseDown)
      articleRef.current.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      <article className={"post-card"} ref={articleRef}>
        <div className="post-card__meta">
          <Typography
            as="span"
            variants="body1"
            className="post-card__meta__reading-time"
          >
            {post.readingTime}분
          </Typography>
          <Typography
            className="post-card__meta__created-at"
            variants="caption1"
          >
            {dayjs(post.date).format("YYYY-MM-DD")}
          </Typography>
        </div>
        <div className="post-card__content">
          <Typography
            className={"post-card__content__title"}
            as="h3"
            variants="h3"
          >
            <Link href={props.post.slug}>
              {props.post.title || "post title"}
            </Link>
          </Typography>
          <Typography
            as="p"
            color="cyan"
            className="post-card__content__description"
          >
            {post.description || "설명이 비어있습니다."}
          </Typography>
          {!!post.tags?.length && (
            <div className="post-card__content__tag-container">
              {post.tags.map(tag => (
                <Tag colorType={tag.colorType} key={tag.content}>
                  {tag.content}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  )
}
