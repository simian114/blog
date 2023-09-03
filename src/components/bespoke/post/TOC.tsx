import { Post } from "@prisma/client"

import DocumentTOC from "@/components/documentTOC/DocumentTOC"
import MobileController from "@/components/layout/mobileController/MobileController"

interface TOCProps {
  post: Post
}

const HEADING_REGEX = /\n(?<header>#{2,3})\s+(?<title>.+)/g

/**
 *
 */
export default async function TOC(props: TOCProps) {
  const post = props.post

  if (!post) {
    return null
  }

  const headings = Array.from((post.content || "").matchAll(HEADING_REGEX))
    .map(({ groups }) => {
      const header = groups?.header
      const title = groups?.title
      return {
        level: header?.length || -1,
        title,
      }
    })
    .reduce((prev, cur) => {
      if (cur.level === 2) {
        prev.push({ title: cur.title || "", children: [] })
        return prev
      } else {
        const lastIdx = prev.length - 1
        if (lastIdx === -1) {
          prev.push({ title: "", children: [] })
          prev[0].children?.push(cur.title || "")
          return prev
        }
        prev[lastIdx].children?.push(cur.title || "")
        return prev
      }
    }, [] as Array<{ title: string; children?: Array<string> }>)

  return (
    <>
      <aside className="sidebar-container">
        <nav>
          <DocumentTOC headings={headings} />
        </nav>
      </aside>
      <MobileController headings={headings} />
    </>
  )
}
