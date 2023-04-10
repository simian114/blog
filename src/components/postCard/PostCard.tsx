"use client"

import { Post } from "contentlayer/generated"
import Link from "next/link"
import Tag from "../tag/Tag"
import dayjs from "dayjs"

interface PostCardProps {
  post: Post
}

export default function PostCard(props: PostCardProps) {
  const { post } = props

  return (
    <article className={"post-card"}>
      <div className="post-card__meta">
        <span className="post-card__meta__reading-time">
          {post.readingTime}
        </span>
        <span className="post-card__meta__created-at">
          {dayjs(post.date).format("YYYY-MM-DD")}
        </span>
      </div>
      <div className="post-card__content">
        <h3 className={"post-card__content__title"}>
          <Link
            prefetch
            className={"post-card__content__link"}
            href={props.post.slug}
          >
            {props.post.title || "post title"}
          </Link>
        </h3>
        <p className="post-card__content__description">
          {post.description || "설명이 비어있습니다."}
        </p>
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
      <Link tabIndex={-1} className="post-card__link" href={post.slug}>
        Read More
      </Link>
    </article>
  )
}
