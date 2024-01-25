import { Prisma } from "@prisma/client"

import CommandMenuClient from "@/components/commandMenu/CommandMenu.client"
import { fetchRouteList } from "@/helpers/data/route"

export type CommandMenuRoute = Prisma.RouteGetPayload<{
  include: { categories: { include: { posts: true } } }
}>

async function getData() {
  const routes = await fetchRouteList({
    include: { categories: { include: { posts: true } } },
    where: { deletedAt: null, open: true, NOT: { url: "" } },
    orderBy: { priority: "asc" },
  })
  return { routes }
}

export default async function CommandMenuServer() {
  const { routes } = await getData()
  return <CommandMenuClient routes={routes} />
}
