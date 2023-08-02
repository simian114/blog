import PostCard, { Post } from "@/components/postCard/PostCard"

interface PostCardListProps {
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
