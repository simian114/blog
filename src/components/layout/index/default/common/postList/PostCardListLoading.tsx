import PostCardLoading from "@/components/postCard/PostCardLoading"

interface PostCardListLoadingProps {
  count?: number
}

// NOTE: disable
export default function PostCardListLoading(props: PostCardListLoadingProps) {
  return (
    <ul className="post-list__posts">
      {Array.from({ length: props.count || 6 }).map((_, index) => (
        <li key={index}>
          <PostCardLoading />
        </li>
      ))}
    </ul>
  )
}
