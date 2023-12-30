import { notFound } from "next/navigation"
import { COMPONENT_POSITION } from "@prisma/client"
import { Prisma } from "@prisma/client"
import { CalendarIcon, LapTimerIcon } from "@radix-ui/react-icons"
import dayjs from "dayjs"

import DeatilBespokeComponentMapper from "@/app/(main)/(bespoke-detail)/[route]/[subURL]/[post]/DetailBespokeComponentMapper"
import MDX from "@/components/mdx/MDX"
import Motion from "@/components/motion/Motion"
import Tag from "@/components/postCard/tag/Tag"
import { fetchPostBy } from "@/helpers/data/post"
import { getPostSlug } from "@/helpers/model/post"

import ViewCounter from "./common/ViewCounter"

interface DetailDefaultLayoutProps {
  post: string
}

export type PostWithComponentRoute = Prisma.PostGetPayload<{
  include: {
    route: { include: { components: true } }
    category: true
    tags: { include: { tag: true } }
  }
}>

async function getData(params: DetailDefaultLayoutProps) {
  const post = await fetchPostBy({
    where: {
      url: params.post,
      deletedAt: null,
    },
    include: {
      route: { include: { components: true } },
      category: true,
      tags: { include: { tag: true } },
    },
  })
  return { post }
}

export default async function DetailDefaultLayout(
  props: DetailDefaultLayoutProps
) {
  const { post } = await getData(props)

  if (!post) {
    notFound()
  }

  const postComponent =
    post.route?.components.filter(
      component => component.position === COMPONENT_POSITION.POST
    ) || []

  const comment = postComponent.find(component => component.name === "Comment")
  const toc = postComponent.find(component => component.name === "TOC")

  return (
    <Motion as="div" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="detail-header-wrapper">
        <h1 className="detail-header__title">{post.title}</h1>
        <div className="detail-header__info">
          <div className="detail-header__meta">
            <div className="detail-header__date">
              <CalendarIcon />
              <span>{dayjs(post.updatedAt).format("YYYY-MM-DD")}</span>
            </div>
            <div className="detail-header__reading-time">
              <LapTimerIcon />
              <span>{post.readingTime}min</span>
            </div>
            <ViewCounter slug={getPostSlug(post)} />
          </div>
          <div className="detail-header__tag-container">
            {!!post.tags?.length && (
              <>
                {post.tags.map((tag, index) => (
                  <Tag key={index} tag={tag.tag} color={tag.tag.color} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`detail-main-wrapper ${
          !!toc ? "detail-main-wrapper--aside" : ""
        }`}
      >
        <main className="detail-main">
          <div className="detail-main__contents">
            <MDX source={post.content || ""} />
          </div>
        </main>

        {!!toc && <DeatilBespokeComponentMapper post={post} component={toc} />}
      </div>
      {!!comment && (
        <DeatilBespokeComponentMapper post={post} component={comment} />
      )}
    </Motion>
  )
}
