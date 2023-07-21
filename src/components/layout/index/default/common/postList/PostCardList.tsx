import { HTMLAttributes } from "react"

import PostCard, { Post } from "@/components/postCard/PostCard"

interface PostCardListProps extends HTMLAttributes<HTMLUListElement> {
  posts: Post[]
}

export default function PostCardList(props: PostCardListProps) {
  return (
    <ul className="post-list__posts">
      {props.posts.map(post => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
