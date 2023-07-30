import { notFound } from "next/navigation"
import { ReactNode } from "react"
import { Prisma } from "@prisma/client"
import { CalendarIcon, LapTimerIcon } from "@radix-ui/react-icons"
import dayjs from "dayjs"

import Comments from "@/components/comment/Comments"
import DocumentTOC from "@/components/documentTOC/DocumentTOC"
import Tag from "@/components/postCard/tag/Tag"
import { getSlug } from "@/helpers/model/post"

import MobileController from "../../mobileController/MobileController"

// import DocumentTOC from "../../../documentTOC/DocumentTOC"
// import Tag from "../../../postCard/tag/Tag"
// import MobileController from "../../mobileController/MobileController"
import ViewCounter from "./common/ViewCounter"

export default function DetailDefaultLayout({
  children,
  post,
}: {
  children: ReactNode
  post: Prisma.PostGetPayload<{
    include: {
      category: true
      route: true
      tags: { include: { tag: true } }
    }
  }>
}) {
  if (!post) {
    notFound()
  }

  const headingRegex = /\n(?<header>#{2,3})\s+(?<title>.+)/g
  const headings = Array.from((post.content || "").matchAll(headingRegex))
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
      <div className="detail-main-wrapper">
        <main className="detail-main">
          <div className="detail-main__title-wrapper">
            <h1 className="detail-main__title">{post.title}</h1>
            <div className="detail-main__info">
              <div className="detail-main__info__left">
                <div className="detail-main__date">
                  <CalendarIcon />
                  <span>{dayjs(post.updatedAt).format("YYYY-MM-DD")}</span>
                </div>
                <div className="detail-main__reading-time">
                  <LapTimerIcon />
                  <span>{post.readingTime}min</span>
                </div>
                <ViewCounter slug={getSlug(post)} />
              </div>
              <div className="detail-main__info__right">
                <div className="detail-main__tags">
                  {!!post.tags?.length && (
                    <div className="post-card__tag-container">
                      {post.tags.map((tag, index) => (
                        <Tag key={index} tag={tag.tag} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="detail-main__contents">{children}</div>
        </main>
        <aside className="sidebar-container">
          {/* NOTE: */}
          <nav>
            <DocumentTOC headings={headings} />
          </nav>
        </aside>
        <MobileController headings={headings} />
      </div>
      <Comments />
    </>
  )
}
