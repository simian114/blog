import { ReactNode } from "react"
import { CalendarIcon, LapTimerIcon } from "@radix-ui/react-icons"
import dayjs from "dayjs"
import { notFound } from "next/navigation"

import Comments from "@/components/comment/Comments"
import { allPulishedPost } from "@/lib/server"

import DocumentTOC from "../../../documentTOC/DocumentTOC"
import Tag from "../../../postCard/tag/Tag"
import MobileController from "../../mobileController/MobileController"

import ViewCounter from "./common/ViewCounter"

export default function DetailDefaultLayout({
  slug,
  children,
}: {
  slug: string[]
  children: ReactNode
}) {
  const post = allPulishedPost.find(post => post.slug.endsWith(slug.join("/")))

  if (!post) {
    notFound()
  }

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
                  <span>{dayjs(post.date).format("YYYY-MM-DD")}</span>
                </div>
                <div className="detail-main__reading-time">
                  <LapTimerIcon />
                  <span>{post.readingTime}min</span>
                </div>
                <ViewCounter slug={slug} />
              </div>
              <div className="detail-main__info__right">
                <div className="detail-main__tags">
                  {!!post.tags?.length && (
                    <div className="post-card__content__tag-container">
                      {post.tags.map(tag => (
                        <Tag colorType={tag.colorType} key={tag.content}>
                          {tag.content}
                        </Tag>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/*  */}
            </div>
          </div>
          <div className="detail-main__contents">{children}</div>
        </main>
        <aside className="sidebar-container">
          <nav>
            <DocumentTOC headings={post.headings} />
          </nav>
        </aside>
        <MobileController headings={post.headings} />
      </div>
      <Comments />
    </>
  )
}
