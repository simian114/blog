import Motion from "@/components/motion/Motion"
import PostCard, { Post } from "@/components/postCard/PostCard"

interface PostCardListProps {
  posts: Post[]
}

// NOTE: disable
export default function PostCardList(props: PostCardListProps) {
  return (
    <ul className="post-list__posts">
      {props.posts.map((post, index) => (
        <Motion
          as="li"
          key={post.id}
          initial={{ opacity: 0, translateX: 20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <PostCard post={post} />
        </Motion>
      ))}
    </ul>
  )
}
