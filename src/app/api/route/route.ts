import { Route } from "@/app/types"
import { allRoutes, getCategoriesByRoute } from "@/constants/post"

const defaultMenus: Route[] = [
  { id: "mdx", children: "mdx", href: "/mdx" },
  { id: "guestbook", children: "guestbook", href: "/guestbook" },
]

function makeMenuByRoutes(routes: string[]) {
  return [
    ...routes.map(
      route =>
        ({
          id: route,
          children: route,
          href: `/${route}`,
          categories: getCategoriesByRoute(route),
        } as Route)
    ),
    ...defaultMenus,
  ]
}

export async function GET() {
  return new Response(JSON.stringify(makeMenuByRoutes(allRoutes)))
}
