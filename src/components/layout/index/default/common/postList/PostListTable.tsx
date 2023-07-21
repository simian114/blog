import Link from "next/link"
import { HTMLAttributes } from "react"

import { Post } from "@/components/postCard/PostCard"
import Tag from "@/components/postCard/tag/Tag"
import Typography from "@/components/typography/Typography"

interface PostListTableProps extends HTMLAttributes<HTMLUListElement> {
  posts: Post[]
}

export default function PostListTable(props: PostListTableProps) {
  return (
    <table className="snippet-main__table postlist-table">
      <thead className="postlist-table__thead">
        <tr className="postlist-table__tr postlist-table__tr--head">
          <th className="postlist-table__th postlist-table__th--name">
            <Typography weight="bold">TITLE</Typography>
          </th>
          <th className="postlist-table__th postlist-table__th--description">
            <Typography weight="bold">DESCRIPTION</Typography>
          </th>
          <th className="postlist-table__th postlist-table__th--category">
            <Typography weight="bold">CATEGORY</Typography>
          </th>
          <th className="postlist-table__th postlist-table__th--tags">
            <Typography weight="bold">TAGS</Typography>
          </th>
        </tr>
      </thead>
      <tbody className="postlist-table__tbody">
        {props.posts.map(post => (
          <tr
            key={post.id}
            className="postlist-table__tr postlist-table__tr--item"
          >
            <td className="postlist-table__td postlist-table__td--name">
              <Link href={post.info?.url || ""}>
                <Typography colorLevel={10} colorType="primary" weight="bold">
                  {post.title}
                </Typography>
              </Link>
            </td>
            <td className="postlist-table__td postlist-table__td--description">
              <Typography>{post.description}</Typography>
            </td>
            <td className="postlist-table__td postlist-table__td--category">
              <Typography>{post.category?.title || ""}</Typography>
            </td>
            <td className="postlist-table__td postlist-table__td--tags">
              {post.tags?.map((tag, i) => (
                <Tag key={i} tag={tag.tag} />
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
