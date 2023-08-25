import { notFound } from "next/navigation"

import MainDetail from "./detail"
import { getStaticParams } from "./getStaticParams"
import MainList from "./list"

export const revalidate = 60 // revalidate this page every 60 seconds

// NOTE: category only
export async function generateStaticParams() {
  return await getStaticParams()
}

/**
 *
 * slug lenght 에 따라 분기처리됨
 *  - length
 *    - 1: route 경로
 *    - 2: category 로의 필터링
 *    - 3: post 의 detail 페이지
 *    - 1, 2의 경우 동일한 layout 을 보여줌. 다른점은 length 가 2인 경우는 해당 카테고리로 필터링이 된 post 가 렌더링됨
 *  - Route 의 layoutType 이 Custom 인 경우는 여기에 들어오지 않음.
 *
 *  TODO
 *    - post list 에 페이지 네이션 / 무한스크롤 구현하기.
 *    - https://www.youtube.com/watch?v=qAgwDGCrzgE&t=255s
 *
 */
export default async function BasePage({
  params,
}: {
  params: { slug: string[] }
}) {
  if (params.slug.length === 1 || params.slug.length === 2) {
    return <MainList routeURL={params.slug[0]} subURL={params.slug?.[1]} />
  } else if (params.slug.length === 3) {
    return <MainDetail slug={params.slug} />
  }
  return notFound()
}
