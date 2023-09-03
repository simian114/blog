import { Post } from "@prisma/client"

import CommentsClient from "@/components/comment/Comments"

interface CommentProps {
  post: Post
}

/**
 *
 */
export default function Comment(props: CommentProps) {
  props
  return <CommentsClient />
}
