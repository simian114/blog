import { notFound } from "next/navigation"

import MainList from "../list"

export const dynamicParams = true

export const revalidate = 3600

export default async function SubURLPage({
  params,
}: {
  params: { route: string; subURL: string }
}) {
  if (params.route || params.subURL) {
    return <MainList routeURL={params.route} subURL={params.subURL} />
  }
  return notFound()
}
