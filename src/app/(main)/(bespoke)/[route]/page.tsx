import { notFound } from "next/navigation"

import MainList from "./list"

export const dynamicParams = true

export const revalidate = 3600

export default async function RoutePage({
  params,
}: {
  params: { route: string }
}) {
  if (params.route) {
    return <MainList routeURL={params.route} />
  }
  return notFound()
}
