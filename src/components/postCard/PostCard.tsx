"use client"
import { Post } from "contentlayer/generated"
import Link from "next/link"
import ButtonLink from "../button/ButtonLink"

interface PostCardProps {
  post: Post
}

export default function PostCard(props: PostCardProps) {
  return (
    <article className={"post-card-wrapper"}>
      <Link
        prefetch
        className={"post-card-wrapper__link"}
        href={props.post.slug}
      >
        <h3 className={"post-card-wrapper__title"}>{props.post.title}</h3>
      </Link>
      <ButtonLink
        className={"post-card-wrapper__link-button"}
        href={props.post.slug}
        design={{ color: "primary" }}
      >
        Read more
      </ButtonLink>
    </article>
  )
}
