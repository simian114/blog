import { ReactNode } from "react"

import PostCard from "@/components/postCard/PostCard"
import { getAllPostsBySlug } from "@/lib/server/post.server"

interface IndexDefaultLayoutProps {
  slug: string
  children: ReactNode
}

export default function IndexDefaultLayout(props: IndexDefaultLayoutProps) {
  const posts = getAllPostsBySlug(props.slug)

  return (
    <main className="index-main">
      <div className="index-main__mdx-wrapper">{props.children}</div>

      <div className="index-main__card-list">
        <h2>최신 글</h2>
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  )
}
