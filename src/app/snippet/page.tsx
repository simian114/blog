import Tag from "@/components/postCard/tag/Tag"
import Typography from "@/components/typography/Typography"
import { getPostBySlugs } from "@/helpers/slug"
import { allSnippetPosts } from "@/lib/server/post.server"
import Link from "next/link"
import { MdxContent } from "../mdx-content"

export default async function Snippet() {
  const posts = allSnippetPosts
  const post = await getPostBySlugs("/snippet")

  return (
    <main className="snippet-main">
      <section className="snippet-main__mdx-wrapper">
        <MdxContent post={post} />
      </section>
      <section>
        <table className="snippet-main__table snippet-table">
          <thead className="snippet-table__thead">
            <tr className="snippet-table__tr snippet-table__tr--head">
              <th className="snippet-table__th snippet-table__th--name">
                <Typography weight="bold">NAME</Typography>
              </th>
              <th className="snippet-table__th snippet-table__th--description">
                <Typography weight="bold">DESCRIPTION</Typography>
              </th>
              <th className="snippet-table__th snippet-table__th--category">
                <Typography weight="bold">CATEGORY</Typography>
              </th>
              <th className="snippet-table__th snippet-table__th--tags">
                <Typography weight="bold">TAGS</Typography>
              </th>
            </tr>
          </thead>
          <tbody className="snippet-table__tbody">
            {posts.map(post => (
              <tr
                key={post._id}
                className="snippet-table__tr snippet-table__tr--item"
              >
                <td className="snippet-table__td snippet-table__td--name">
                  <Link href={post.slug}>
                    <Typography
                      colorLevel={10}
                      colorType="primary"
                      weight="bold"
                    >
                      {post.title}
                    </Typography>
                  </Link>
                </td>
                <td className="snippet-table__td snippet-table__td--description">
                  <Typography>{post.description}</Typography>
                </td>
                <td className="snippet-table__td snippet-table__td--category">
                  <Typography>{post.category}</Typography>
                </td>
                <td className="snippet-table__td snippet-table__td--tags">
                  {post.tags?.map((tag, i) => (
                    <Tag key={i} colorType={tag.colorType}>
                      {tag.content}
                    </Tag>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
