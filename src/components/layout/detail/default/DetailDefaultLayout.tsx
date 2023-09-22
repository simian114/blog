import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import { COMPONENT_POSITION } from "@prisma/client"
import { CalendarIcon, LapTimerIcon } from "@radix-ui/react-icons"
import dayjs from "dayjs"

import DeatilBespokeComponentMapper from "@/app/(main)/(bespoke-detail)/[route]/[subURL]/[post]/DetailBespokeComponentMapper"
import { MdxComponents } from "@/components/mdx/mdxComponents"
import Tag from "@/components/postCard/tag/Tag"
import { getPostSlug } from "@/helpers/model/post"
import prisma from "@/lib/prisma"

import ViewCounter from "./common/ViewCounter"

async function getData(params: DetailDefaultLayoutProps) {
  try {
    const post =
      (await prisma.post.findFirst({
        where: {
          route: { url: params.route },
          category: { url: params.category },
          url: params.post,
        },
        include: {
          route: {
            include: {
              components: true,
            },
          },
          category: true,
          tags: { include: { tag: true } },
        },
      })) || undefined

    return { post }
  } catch (error) {
    return { post: null }
  }
}

interface DetailDefaultLayoutProps {
  route: string
  category: string
  post: string
}

export default async function DetailDefaultLayout(
  props: DetailDefaultLayoutProps
) {
  const { post } = await getData(props)

  if (!post) {
    notFound()
  }

  const { content: MDXContent } = await compileMDX({
    source: post?.content || "",
    components: MdxComponents,
  })

  const postComponent =
    post.route?.components.filter(
      component => component.position === COMPONENT_POSITION.POST
    ) || []

  const comment = postComponent.find(component => component.name === "Comment")
  const toc = postComponent.find(component => component.name === "TOC")

  return (
    <>
      <div
        className={`detail-main-wrapper ${
          !!toc ? "detail-main-wrapper--aside" : ""
        }`}
      >
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
                <ViewCounter slug={getPostSlug(post)} />
              </div>
              <div className="detail-main__info__right">
                <div className="detail-main__tags">
                  {!!post.tags?.length && (
                    <div className="post-card__tag-container">
                      {post.tags.map((tag, index) => (
                        <Tag key={index} tag={tag.tag} color={tag.tag.color} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="detail-main__contents">{MDXContent}</div>
        </main>

        {!!toc && <DeatilBespokeComponentMapper post={post} component={toc} />}
      </div>
      {!!comment && (
        <DeatilBespokeComponentMapper post={post} component={comment} />
      )}
    </>
  )
}
