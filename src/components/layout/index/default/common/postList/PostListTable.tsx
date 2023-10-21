import Link from "next/link"

import Motion from "@/components/motion/Motion"
import { Post } from "@/components/postCard/PostCard"
import Tag from "@/components/postCard/tag/Tag"
import Typography from "@/components/typography/Typography"
import { getPostURL } from "@/helpers/model/post"

interface PostListTableProps {
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
        {props.posts.map((post, index) => (
          <Motion
            as="tr"
            key={post.id}
            className="postlist-table__tr postlist-table__tr--item"
            initial={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <td className="postlist-table__td postlist-table__td--name">
              <Link href={getPostURL(post)}>
                <Typography colorLevel={10} colorType="PRIMARY" weight="bold">
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
                <Tag key={i} tag={tag.tag} color={tag.tag.color} />
              ))}
            </td>
          </Motion>
        ))}
      </tbody>
    </table>
  )
}
