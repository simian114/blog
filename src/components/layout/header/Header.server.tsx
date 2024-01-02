import { fetchRouteList } from "@/helpers/data/route"

import HeaderClient from "./Header.client"

async function getData() {
  const routes = await fetchRouteList({
    include: { categories: true },
    where: {
      deletedAt: null,
      open: true,
      NOT: { url: "" },
    },
    orderBy: { priority: "asc" },
  })
  return { routes }
}
export default async function Header() {
  const { routes } = await getData()
  return <HeaderClient routes={routes} />
}
